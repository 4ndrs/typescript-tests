// discriminated unions
type MediaProps = { id: number } & (
  | { type: "Manga"; chapters: number }
  | { type: "Anime"; episodes: number }
);

const SomeMediaComponent = (props: MediaProps) => {
  if (props.type === "Anime") {
    return props.episodes;
  }

  return props.chapters;
};

SomeMediaComponent({ id: 1, type: "Anime", episodes: 23 });
SomeMediaComponent({ id: 2, type: "Manga", chapters: 118 });
