export type MinimalTreeItemData = {
  id: number;
  value: string;
  children?: MinimalTreeItemData[];
};

export type CategoryTreeData = {
  id: number;
  value: string;
  parentId: number | null;
}

export type SavedPostsData = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  category: string;
}

export type SetItemsType = React.Dispatch<React.SetStateAction<MinimalTreeItemData[]>>;

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