from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import pymongo
import os
import time
import re
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# MongoDB Connection
client = pymongo.MongoClient(os.getenv("MONGO_URI"))
db = client["bbc_news"]
articles_collection = db["articles"]  # Collection name

# Set up Selenium options
options = Options()
options.add_experimental_option("excludeSwitches", ["enable-logging"])
driver = webdriver.Chrome(options=options)

# BBC Sections to Scrape
sections = {
    "Home": "https://www.bbc.com/news",
    "News": "https://www.bbc.com/news/world",
    "Sport": "https://www.bbc.com/sport",
    "Business": "https://www.bbc.com/news/business",
    "Innovation": "https://www.bbc.com/news/technology",
    "Culture": "https://www.bbc.com/culture",
    "Arts": "https://www.bbc.com/news/entertainment_and_arts",
    "Travel": "https://www.bbc.com/travel",
    "Earth": "https://www.bbc.com/news/science_and_environment",
    "Audio": "https://www.bbc.com/sounds",
    "Video": "https://www.bbc.com/news/video_and_audio",
    "Live": "https://www.bbc.com/news/live"
}

article_links = set()  # Use a set to store unique links

# Function to extract articles from a section
def extract_article_links(section_name, section_url):
    print(f"🔍 Visiting {section_name}: {section_url}")
    driver.get(section_url)
    time.sleep(3)  # Allow page to load

    try:
        WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.XPATH, '//a[contains(@href, "/news/") or contains(@href, "/sport/") or contains(@href, "/business/") or contains(@href, "/technology/") or contains(@href, "/culture/") or contains(@href, "/travel/")]'))
        )

        a_elements = driver.find_elements(By.XPATH, '//a[contains(@href, "/news/") or contains(@href, "/sport/") or contains(@href, "/business/") or contains(@href, "/technology/") or contains(@href, "/culture/") or contains(@href, "/travel/")]')

        for a in a_elements:
            link = a.get_attribute("href")
            if link and not any(exclude in link for exclude in ["/live/", "/video/", "/programmes/", "/reel/", "/sounds/"]):
                article_links.add((link, section_name))  # Store link with its category

    except Exception as e:
        print(f"⚠️ No articles found in {section_url}: {e}")

# Extract articles from all sections
for category, section in sections.items():
    extract_article_links(category, section)

print(f"✅ Total unique articles found: {len(article_links)}")

# Scrape article details
for index, (article_url, category) in enumerate(article_links):
    print(f"📄 Scraping {index + 1}/{len(article_links)}: {article_url}")
    driver.get(article_url)
    time.sleep(3)

    soup = BeautifulSoup(driver.page_source, "html.parser")

    try:
        headline = soup.find("h1").text.strip() if soup.find("h1") else "N/A"
        author = soup.find("span", class_="sc-b42e7a8f-7 khDNZq")
        author = author.text.strip() if author else "By BBC news"
        published_date = soup.find("time")
        published_date = published_date.text.strip() if published_date else "N/A"
        summary = soup.find("meta", {"name": "description"})
        summary = summary["content"].strip() if summary else "N/A"
        content = " ".join([p.text.strip() for p in soup.find_all("p")])
        image_url = soup.find("img")
        image_url = image_url["src"] if image_url else "N/A"

        # Check if article already exists (avoid duplicates)
        if articles_collection.find_one({"source_link": article_url}):
            print(f"⚠️ Skipping duplicate: {headline}")
            continue

        article_data = {
            "headline": headline,
            "author": author,
            "published_date": published_date,
            "summary": summary,
            "content": content,
            "image_url": image_url,
            "source_link": article_url,
            "category": category
        }

        # Store data in MongoDB
        articles_collection.insert_one(article_data)

        print(f"✅ Stored: {headline} ({category})")

    except Exception as e:
        print(f"❌ Error scraping {article_url}: {e}")
        continue

print("Existing Collections:", db.list_collection_names())

# Close Selenium
driver.quit()
print("🎉 Scraping & Upload Complete!")
