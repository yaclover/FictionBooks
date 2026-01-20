
import { Book } from './types';

export const APP_NAME = "Fiction Library";
export const COVER_STYLE_VERSION = "ART_DECO_V1";

export const SEED_LIST_SOURCE = "Global Literary Classics Selection";
export const SEED_LIST_URL = "#";

export const SEED_BOOKS: Partial<Book>[] = [
  { title: "Don Quixote", titleZh: "唐吉訶德", author: "Miguel de Cervantes", authorZh: "塞凡提斯", year: 1605, significanceScore: 10 },
  { title: "Robinson Crusoe", titleZh: "魯賓遜漂流記", author: "Daniel Defoe", authorZh: "丹尼爾·笛福", year: 1719, significanceScore: 8 },
  { title: "Gulliver's Travels", titleZh: "格列佛遊記", author: "Jonathan Swift", authorZh: "喬納森·斯威夫特", year: 1726, significanceScore: 8 },
  { title: "Pride and Prejudice", titleZh: "傲慢與偏見", author: "Jane Austen", authorZh: "珍·奧斯汀", year: 1813, significanceScore: 9 },
  { title: "Frankenstein", titleZh: "科學怪人", author: "Mary Shelley", authorZh: "瑪麗·雪萊", year: 1818, significanceScore: 9 },
  { title: "The Last of the Mohicans", titleZh: "最後的摩根戰士", author: "James Fenimore Cooper", authorZh: "詹姆斯·費尼莫爾·庫柏", year: 1826, significanceScore: 7 },
  { title: "The Hunchback of Notre-Dame", titleZh: "鐘樓怪人", author: "Victor Hugo", authorZh: "維克多·雨果", year: 1831, significanceScore: 9 },
  { title: "Oliver Twist", titleZh: "孤雛淚", author: "Charles Dickens", authorZh: "查爾斯·狄更斯", year: 1837, significanceScore: 8 },
  { title: "The Count of Monte Cristo", titleZh: "基督山恩仇記", author: "Alexandre Dumas", authorZh: "大仲馬", year: 1844, significanceScore: 9 },
  { title: "Jane Eyre", titleZh: "簡愛", author: "Charlotte Brontë", authorZh: "夏洛蒂·勃朗特", year: 1847, significanceScore: 9 },
  { title: "Wuthering Heights", titleZh: "咆哮山莊", author: "Emily Brontë", authorZh: "艾米莉·勃朗特", year: 1847, significanceScore: 9 },
  { title: "Vanity Fair", titleZh: "浮華世界", author: "William Makepeace Thackeray", authorZh: "威廉·梅克比斯·薩克雷", year: 1848, significanceScore: 8 },
  { title: "David Copperfield", titleZh: "塊肉餘生錄", author: "Charles Dickens", authorZh: "查爾斯·狄更斯", year: 1850, significanceScore: 9 },
  { title: "The Scarlet Letter", titleZh: "紅字", author: "Nathaniel Hawthorne", authorZh: "納撒尼爾·霍桑", year: 1850, significanceScore: 8 },
  { title: "Moby-Dick", titleZh: "白鯨記", author: "Herman Melville", authorZh: "赫爾曼·梅爾維爾", year: 1851, significanceScore: 10 },
  { title: "Madame Bovary", titleZh: "包法利夫人", author: "Gustave Flaubert", authorZh: "居斯塔夫·福樓拜", year: 1856, significanceScore: 10 },
  { title: "A Tale of Two Cities", titleZh: "雙城記", author: "Charles Dickens", authorZh: "查爾斯·狄更斯", year: 1859, significanceScore: 9 },
  { title: "Great Expectations", titleZh: "遠大前程", author: "Charles Dickens", authorZh: "查爾斯·狄更斯", year: 1861, significanceScore: 9 },
  { title: "Les Misérables", titleZh: "悲慘世界", author: "Victor Hugo", authorZh: "維克多·雨果", year: 1862, significanceScore: 10 },
  { title: "Alice's Adventures in Wonderland", titleZh: "愛麗絲夢遊仙境", author: "Lewis Carroll", authorZh: "路易斯·卡羅", year: 1865, significanceScore: 9 },
  { title: "Crime and Punishment", titleZh: "罪與罰", author: "Fyodor Dostoevsky", authorZh: "杜斯妥也夫斯基", year: 1866, significanceScore: 10 },
  { title: "War and Peace", titleZh: "戰爭與和平", author: "Leo Tolstoy", authorZh: "托爾斯泰", year: 1869, significanceScore: 10 },
  { title: "Anna Karenina", titleZh: "安娜·卡列尼娜", author: "Leo Tolstoy", authorZh: "托爾斯泰", year: 1877, significanceScore: 10 },
  { title: "The Brothers Karamazov", titleZh: "卡拉馬助夫兄弟們", author: "Fyodor Dostoevsky", authorZh: "杜斯妥也夫斯基", year: 1880, significanceScore: 10 },
  { title: "Treasure Island", titleZh: "金銀島", author: "Robert Louis Stevenson", authorZh: "史蒂文生", year: 1883, significanceScore: 7 },
  { title: "The Adventures of Huckleberry Finn", titleZh: "哈克貝利·費恩歷險記", author: "Mark Twain", authorZh: "馬克·吐溫", year: 1884, significanceScore: 9 },
  { title: "The Picture of Dorian Gray", titleZh: "道林·格雷的畫像", author: "Oscar Wilde", authorZh: "奧斯卡·王爾德", year: 1890, significanceScore: 8 },
  { title: "Dracula", titleZh: "德古拉", author: "Bram Stoker", authorZh: "布蘭姆·斯托克", year: 1897, significanceScore: 8 },
  { title: "The Heart of Darkness", titleZh: "黑暗之心", author: "Joseph Conrad", authorZh: "約瑟夫·康拉德", year: 1899, significanceScore: 9 },
  { title: "The Way of All Flesh", titleZh: "眾生之路", author: "Samuel Butler", authorZh: "塞繆爾·巴特勒", year: 1903, significanceScore: 7 },
  { title: "The Call of the Wild", titleZh: "野性的呼喚", author: "Jack London", authorZh: "傑克·倫敦", year: 1903, significanceScore: 8 },
  { title: "Sons and Lovers", titleZh: "兒子與情人", author: "D.H. Lawrence", authorZh: "D·H·勞倫斯", year: 1913, significanceScore: 8 },
  { title: "A Portrait of the Artist as a Young Man", titleZh: "一個青年藝術家的畫像", author: "James Joyce", authorZh: "詹姆斯·喬伊斯", year: 1916, significanceScore: 9 },
  { title: "The Metamorphosis", titleZh: "變形記", author: "Franz Kafka", authorZh: "卡夫卡", year: 1915, significanceScore: 10 },
  { title: "Ulysses", titleZh: "尤利西斯", author: "James Joyce", authorZh: "詹姆斯·喬伊斯", year: 1922, significanceScore: 10 },
  { title: "The Great Gatsby", titleZh: "大亨小傳", author: "F. Scott Fitzgerald", authorZh: "費茲傑羅", year: 1925, significanceScore: 9 },
  { title: "To the Lighthouse", titleZh: "到燈塔去", author: "Virginia Woolf", authorZh: "維吉尼亞·吳爾芙", year: 1927, significanceScore: 9 },
  { title: "All Quiet on the Western Front", titleZh: "西線無戰事", author: "Erich Maria Remarque", authorZh: "雷馬克", year: 1929, significanceScore: 8 },
  { title: "The Sound and the Fury", titleZh: "喧嘩與騷動", author: "William Faulkner", authorZh: "威廉·福克納", year: 1929, significanceScore: 9 },
  { title: "Brave New World", titleZh: "美麗新世界", author: "Aldous Huxley", authorZh: "阿道司·赫胥黎", year: 1932, significanceScore: 9 },
  { title: "Gone with the Wind", titleZh: "亂世佳人", author: "Margaret Mitchell", authorZh: "瑪格麗特·米切爾", year: 1936, significanceScore: 8 },
  { title: "The Grapes of Wrath", titleZh: "憤怒的葡萄", author: "John Steinbeck", authorZh: "約翰·史坦貝克", year: 1939, significanceScore: 9 },
  { title: "The Stranger", titleZh: "異鄉人", author: "Albert Camus", authorZh: "卡繆", year: 1942, significanceScore: 10 },
  { title: "Animal Farm", titleZh: "動物農莊", author: "George Orwell", authorZh: "喬治·歐威爾", year: 1945, significanceScore: 10 },
  { title: "1984", titleZh: "一九八四", author: "George Orwell", authorZh: "喬治·歐威爾", year: 1949, significanceScore: 10 },
  { title: "The Catcher in the Rye", titleZh: "麥田捕手", author: "J.D. Salinger", authorZh: "沙林傑", year: 1951, significanceScore: 9 },
  { title: "Invisible Man", titleZh: "看不見的人", author: "Ralph Ellison", authorZh: "拉爾夫·艾里森", year: 1952, significanceScore: 8 },
  { title: "The Old Man and the Sea", titleZh: "老人與海", author: "Ernest Hemingway", authorZh: "海明威", year: 1952, significanceScore: 10 },
  { title: "Lord of the Flies", titleZh: "蒼蠅王", author: "William Golding", authorZh: "威廉·高丁", year: 1954, significanceScore: 9 },
  { title: "Lolita", titleZh: "蘿莉塔", author: "Vladimir Nabokov", authorZh: "納博科夫", year: 1955, significanceScore: 9 }
];

export const SUMMARY_MODEL = 'gemini-3-flash-preview';
export const IMAGE_MODEL = 'gemini-3-pro-image-preview';
