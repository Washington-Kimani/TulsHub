import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from collections import deque
import csv

def crawl_website(start_url, max_pages=100):
    visited = set()
    queue = deque([start_url])
    domain = urlparse(start_url).netloc

    results = []

    while queue and len(visited) < max_pages:
        url = queue.popleft()

        if url in visited:
            continue

        try:
            response = requests.get(url, timeout=5)
            if response.status_code != 200:
                continue

            soup = BeautifulSoup(response.text, "html.parser")

            # Get page title (Page Name)
            title = soup.title.string.strip() if soup.title and soup.title.string else "No Title"

            visited.add(url)

            results.append({
                "name": title,
                "url": url
            })

            print(f"Crawled: {url}")

            for link in soup.find_all("a", href=True):
                href = link.get("href")

                full_url = urljoin(url, href)
                parsed = urlparse(full_url)

                if parsed.netloc == domain:
                    clean_url = parsed.scheme + "://" + parsed.netloc + parsed.path.rstrip("/")

                    if clean_url not in visited:
                        queue.append(clean_url)

        except Exception as e:
            print(f"Error crawling {url}: {e}")

    return results


def save_to_csv(pages, filename="pages.csv"):
    with open(filename, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["Number", "Page Name", "Page URL"])

        for i, page in enumerate(pages, start=1):
            writer.writerow([i, page["name"], page["url"]])


if __name__ == "__main__":
    start_url = "https://usesmileid.com/"
    pages = crawl_website(start_url, max_pages=200)

    print(f"\nTotal Pages Found: {len(pages)}")

    save_to_csv(pages)