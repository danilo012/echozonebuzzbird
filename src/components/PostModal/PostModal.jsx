import { useAuth } from "../../contexts/auth-context";
import { PrimaryButton, SecondaryButton, UserAvatar } from "..";
import { useRef, useState } from "react";
import { BsFillImageFill, FaSmile, MdCancel } from "../../utils/icons";
import { toast } from "react-hot-toast";

const PostModal = ({ post, setShowPostModal, setShowOptions }) => {
  const { currentUser } = useAuth();

  const [content, setContent] = useState(post || {});
  const [media, setMedia] = useState(null);

  const postRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <div className="grid grid-cols-[2rem_1fr] gap-2 items-start bg-lighterPrimary text-sm border-darkGrey px-4 py-3 cursor-text w-[80%] sm:w-[50%] shadow-dark shadow-lg rounded-md border">
      <UserAvatar user={currentUser} className="h-9 w-9" />
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <div className="w-full break-all outline-none mt-1.5 bg-lighterPrimary">
          <input
            type="text"
            ref={postRef}
            className="w-full break-all outline-none bg-lighterPrimary"
            placeholder="What is happening?!"
            onChange={(e) =>
              setContent((prev) => ({ ...prev, content: e.target.value }))
            }
            onKeyPress={handleKeyPress}
          />

          {content?.mediaURL || media ? (
            <div className="relative">
              <img
                src={media ? URL.createObjectURL(media) : content?.mediaURL}
                alt={content?.mediaAlt || media.name.split(".")[0]}
              />
              <button
                type="button"
                className="absolute top-1.5 left-2 text-lg"
                onClick={() =>
                  content?.mediaURL
                    ? setContent((prev) => ({
                        ...prev,
                        mediaURL: null,
                        mediaAlt: "",
                      }))
                    : setMedia(null)
                }
              >
                <MdCancel />
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="flex justify-between gap-2">
          <div className="flex justify-center items-center gap-3">
            <label className="cursor-pointer text-lg">
              <input
                type="file"
                accept="/image*"
                className="hidden"
                onChange={(e) => {
                  if (Math.round(e.target.files[0].size / 1024000) > 1) {
                    toast.error("File size should not be more than 1Mb");
                  } else {
                    setMedia(e.target.files[0]);
                  }
                }}
              />
              <BsFillImageFill />
            </label>
            <label className="cursor-pointer text-xl">
              <input className="hidden" />
              <FaSmile />
            </label>
          </div>
          <div className="flex gap-3">
            <PrimaryButton
              type="submit"
              className="py-1.5 px-5 rounded-md disabled:opacity-80 border-lightPrimary"
              disabled={!content?.content?.trim() && !media}
            >
              {post ? "Save" : "Post"}
            </PrimaryButton>
            <SecondaryButton
              type="reset"
              className="py-1 px-4 rounded-md border-none"
              onClick={() => {
                setShowPostModal((prev) => !prev);
                post && setShowOptions((prev) => !prev);
              }}
            >
              Cancel
            </SecondaryButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export { PostModal };
