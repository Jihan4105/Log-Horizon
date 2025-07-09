export type MinimalTreeItemData = {
  id: number;
  value: string;
  parentId: number | null;
  children?: MinimalTreeItemData[];
};

export type UserData = {
  userid: string;
  username: string;
  userprofile: string;
  email: string;
  createdAt: string;
  comments: number;
  likes: number;
  hmms: number;
  unlikes: number;
}