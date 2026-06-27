import { HashIcon, LockIcon, UsersIcon, PinIcon, VideoIcon, MenuIcon, TrashIcon } from "lucide-react";
import { useChannelStateContext } from "stream-chat-react";
import { useState } from "react";
import { useUser, UserButton } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import MembersModal from "./MembersModal";
import PinnedMessagesModal from "./PinnedMessagesModal";
import InviteModal from "./InviteModal";

const CustomChannelHeader = ({ onMenuClick }) => {
  const { channel } = useChannelStateContext();
  const { user } = useUser();

  const memberCount = Object.keys(channel.state.members).length;

  const [showInvite, setShowInvite] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [showPinnedMessages, setShowPinnedMessages] = useState(false);
  const [pinnedMessages, setPinnedMessages] = useState([]);

  const otherUser = Object.values(channel.state.members).find(
    (member) => member.user.id !== user.id
  );

  const isDM = channel.data?.member_count === 2 && channel.data?.id.includes("user_");
  const isCreator = channel.data?.created_by_id === user.id || channel.data?.created_by?.id === user.id;

  const handleShowPinned = async () => {
    const channelState = await channel.query();
    setPinnedMessages(channelState.pinned_messages);
    setShowPinnedMessages(true);
  };

  const handleVideoCall = async () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;
      await channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });
    }
  };

  const handleDeleteChannel = async () => {
    if (window.confirm("Are you sure you want to delete this channel? This action cannot be undone.")) {
      try {
        await channel.delete();
        toast.success("Channel deleted successfully");
        window.location.href = "/";
      } catch (error) {
        console.error("Error deleting channel:", error);
        toast.error("Failed to delete channel");
      }
    }
  };

  return (
    <div className="h-14 border-b border-gray-200 flex items-center px-4 justify-between bg-white mobile-header-parent">
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-1 hover:bg-gray-100 rounded-md mr-1"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <MenuIcon className="size-6 text-[#616061]" />
        </button>

        <div className="flex items-center gap-2">
          {!isDM &&
            (channel.data?.private ? (
              <LockIcon className="size-4 text-[#616061]" />
            ) : (
              <HashIcon className="size-4 text-[#616061]" />
            ))}

          {isDM && otherUser?.user?.image && (
            <img
              src={otherUser.user.image}
              alt={otherUser.user.name || otherUser.user.id}
              className="size-7 rounded-full object-cover mr-1"
            />
          )}

          <span className="font-medium text-[#1D1C1D]">
            {isDM ? otherUser?.user?.name || otherUser?.user?.id : channel.data?.id}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="flex items-center gap-2 hover:bg-[#F8F8F8] py-1 px-2 rounded"
          onClick={() => setShowMembers(true)}
        >
          <UsersIcon className="size-5 text-[#616061]" />
          <span className="text-sm text-[#616061]">{memberCount}</span>
        </button>

        <button
          className="hover:bg-[#F8F8F8] p-1 rounded"
          onClick={handleVideoCall}
          title="Start Video Call"
        >
          <VideoIcon className="size-5 text-[#1264A3]" />
        </button>

        {channel.data?.private && (
          <button className="btn btn-primary" onClick={() => setShowInvite(true)}>
            Invite
          </button>
        )}

        <button className="hover:bg-[#F8F8F8] p-1 rounded" onClick={handleShowPinned}>
          <PinIcon className="size-4 text-[#616061]" />
        </button>

        {isCreator && !isDM && (
          <button className="hover:bg-[#F8F8F8] p-1 rounded" onClick={handleDeleteChannel} title="Delete Channel">
            <TrashIcon className="size-4 text-red-500" />
          </button>
        )}
      </div>

      {showMembers && (
        <MembersModal
          members={Object.values(channel.state.members)}
          onClose={() => setShowMembers(false)}
        />
      )}

      {showPinnedMessages && (
        <PinnedMessagesModal
          pinnedMessages={pinnedMessages}
          onClose={() => setShowPinnedMessages(false)}
        />
      )}

      {showInvite && <InviteModal channel={channel} onClose={() => setShowInvite(false)} />}
    </div>
  );
};

export default CustomChannelHeader;