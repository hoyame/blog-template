import { PostTitle } from "@/app/_components/post-title";

type Props = {
  title: string;
};

export function PostHeader({ title }: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
    </>
  );
}
