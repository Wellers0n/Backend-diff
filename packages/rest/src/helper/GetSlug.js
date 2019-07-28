import GetRandom from "./GetRandom";
import Slugify from "./Slugify";

function getSlug(url, title) {
  const slug = Slugify(title);
  const random = GetRandom(1, 100000000);
  const permalink = `${url}/${slug}-${random}`;
  return permalink;
}

export default getSlug