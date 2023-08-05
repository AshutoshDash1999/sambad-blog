"use client";
import { db } from "@/utils/firebaseConfig";
import { Button, Modal, Textarea, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconBallpen, IconHeading } from "@tabler/icons-react";
import { doc, setDoc } from "firebase/firestore";
import { ChangeEvent, useId, useState } from "react";

const PublishBlog = () => {
  const [openedBlogModal, { open, close }] = useDisclosure(false);

  const [blogContent, setBlogContent] = useState<{
    title: string;
    content: string;
  }>({
    title: "",
    content: "",
  });

  const [isBlogUploadLoading, setIsBlogUploadLoading] =
    useState<boolean>(false);

  const blogId = useId();
  // upload product data to firestore
  const publishBlogData = async () => {
    const date = new Date();

    const payload = {
      ...blogContent,
      blogId,
      publishedDateTime: `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}  ${date.getHours()}${date.getMinutes()}${date.getSeconds()}`,
    };

    try {
      await setDoc(doc(db, "blogData", blogId), payload)
        .then(() => {
          notifications.show({
            message: "Blog Published 🥳",
          });
        })
        .catch((error) => {
          notifications.show({
            message: "Error publishing blog! 🤥",
          });
        });
    } catch (error) {
      notifications.show({
        message: "Error publishing blog! 🤥",
      });
    }
  };

  return (
    <>
      <Modal
        opened={openedBlogModal}
        onClose={close}
        title="Publish a new blog"
        centered
      >
        <TextInput
          label="Title"
          name="title"
          icon={<IconHeading />}
          value={blogContent?.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setBlogContent({ ...blogContent, title: e.target.value })
          }
        />
        <Textarea
          placeholder="Your comment"
          label="Your comment"
          icon={<IconBallpen />}
          value={blogContent?.content}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setBlogContent({ ...blogContent, content: e.target.value })
          }
          minRows={4}
          className="my-4"
        />

        <div className="flex justify-center items-center">
          <Button onClick={publishBlogData} loading={loading}>
            Login
          </Button>
        </div>
      </Modal>

      <Button onClick={open}>Open centered Modal</Button>
    </>
  );
};
export default PublishBlog;
