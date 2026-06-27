import { HashIcon, TrashIcon } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";

const CustomChannelPreview = ({ channel, setActiveChannel, activeChannel }) => {
  const { user } = useUser();
  const isActive = activeChannel && activeChannel.id === channel.id;
  const isDM = channel.data.member_count === 2 && channel.data.id.includes("user_");
  const isCreator = channel.data?.created_by_id === user?.id || channel.data?.created_by?.id === user?.id;

  if (isDM) return null;

  const unreadCount = channel.countUnread();

  const handleDeleteChannel = async (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this channel?")) {
      try {
        await channel.delete();
        toast.success("Channel deleted successfully");
        if (isActive) {
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Error deleting channel:", error);
        toast.error("Failed to delete channel");
      }
    }
  };

  return (
    <div
      className={`str-chat__channel-preview-messenger transition-colors group flex items-center w-full text-left px-4 py-2 rounded-lg mb-1 font-medium hover:bg-blue-50/80 min-h-9 ${
        isActive
          ? "!bg-black/20 !hover:bg-black/20 border-l-8 border-purple-500 shadow-lg text-blue-900"
          : ""
      }`}
    >
      <button
        onClick={() => setActiveChannel(channel)}
        className="flex-1 flex items-center bg-transparent border-none outline-none w-full text-left"
      >
        <HashIcon className="w-4 h-4 text-[#9b9b9b] mr-2" />
        <span className="str-chat__channel-preview-messenger-name flex-1">{channel.data.id}</span>

        {unreadCount > 0 && (
          <span className="flex items-center justify-center ml-2 size-4 text-xs rounded-full bg-red-500 ">
            {unreadCount}
          </span>
        )}
      </button>

      {isCreator && (
        <button
          onClick={handleDeleteChannel}
          className="ml-2 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity rounded bg-transparent"
          title="Delete Channel"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
export default CustomChannelPreview;