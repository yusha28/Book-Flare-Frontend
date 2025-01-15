const audiobooks = [
    {
      id: 1,
      title: "Frankenstein",
      author: "Mary Shelley",
      price: 500,
      image: "/images/frankenstein.jpg",
      description:
        "Frankenstein is a classic gothic novel that explores themes of human ambition, morality, and the consequences of playing god.",
      chapters: [
        { title: "Introduction", audioSrc: "/audio/frankenstein/chapter1.mp3" },
        { title: "Chapter 1", audioSrc: "/audio/frankenstein/chapter2.mp3" },
      ],
    },
    {
      id: 2,
      title: "The Alchemist",
      author: "Paulo Coelho",
      price: 450,
      image: "/images/the_alchemist.jpg",
      description:
        "The Alchemist is a spiritual journey of a shepherd boy, Santiago, who dreams of finding a treasure buried in the Egyptian pyramids.",
      chapters: [
        { title: "Prologue", audioSrc: "/audio/the_alchemist/prologue.mp3" },
        { title: "Chapter 1", audioSrc: "/audio/the_alchemist/chapter1.mp3" },
      ],
    },
  ];
  
  export default audiobooks;
  