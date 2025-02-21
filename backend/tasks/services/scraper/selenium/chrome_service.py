from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import re
import os

class ChromeService:

    def __init_options(self):
        chrome_options = webdriver.ChromeOptions()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        # chrome_options.add_argument(
        #     "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        #     "(KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36"
        # )
        return chrome_options

    def __init__(self, url: str):
        self.url = url
        options = self.__init_options()
        self.browser = webdriver.Chrome(options=options)


    def start_scraping(self) -> dict[str, list]:
        scraped_links = {}
        try:
            self.browser.get(self.url)
            wait = WebDriverWait(self.browser, 10)
            table = wait.until(
                EC.visibility_of_element_located((By.ID, 'tbody-content'))
            )
            a_elements = table.find_elements(By.TAG_NAME, "a")
            for a in a_elements:
                href = a.get_attribute("href")
                if href.endswith(".zip"):
                    print("Found the URL:", href)
                    file_basename = os.path.basename(href)

                    found_dates = re.findall(r'\d+', file_basename)
                    try:
                        str_date = found_dates[0]
                        if str_date in scraped_links:
                            scraped_links[str_date].append(href)
                        else:
                            scraped_links[str_date] = [href]
                    except IndexError:
                        print("Not found str_date in file with basename:", file_basename)

            # with open("dataset_files.json", "w+") as f:
            #     f.write(json.dumps(scraped_links, indent=2))
        finally:
            self.browser.quit()
            return scraped_links