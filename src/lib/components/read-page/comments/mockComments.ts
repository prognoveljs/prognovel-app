interface Comment {
  id: number;
  name: string;
  content: string;
  like?: number;
  dislike?: number;
  status?: any;
}

export const mockComments: Comment[] = [
  {
    id: 23,
    name: "Bot",
    content: `Hey this is a new :blobhappy: comments!`,
    like: 44,
    dislike: 23,
  },
  {
    id: 1,
    name: "Read",
    content: `Testing blob emojji :blobsad: weeeeeeee!`,
    like: 2444,
    dislike: 3,
  },
  {
    id: 23,
    name: "Jon the Rich Man",
    content: `Wow so many fake likes wooow wowww :doge: so fakes`,
    like: 582137251,
    dislike: 233123,
    status: [
      {
        name: "vip",
        type: "membership",
        color: "green",
      },
    ],
  },
  {
    id: 23,
    name: "RandomUser",
    content: `Hey this is a new :blobhappy: comments!`,
    like: 44,
    dislike: 23,
  },
];
