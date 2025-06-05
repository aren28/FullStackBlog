export type PostType = {
  posts: PostItem[];
};

export type PostItem = {
  id: number;
  title: string;
  description: string;
  userProfileId: string;
  DateTime: string;
};

export type PostBlogType = {
  title: string;
  description: string;
  userProfileId: string;
};
