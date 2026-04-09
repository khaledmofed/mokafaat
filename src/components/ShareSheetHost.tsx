import { useShareSheetStore } from "@stores/shareSheetStore";
import ShareSheetModal from "@components/ShareSheetModal";

export default function ShareSheetHost() {
  const open = useShareSheetStore((s) => s.open);
  const payload = useShareSheetStore((s) => s.payload);
  const closeShare = useShareSheetStore((s) => s.closeShare);

  if (!open || !payload?.url) return null;

  return (
    <ShareSheetModal
      open={open}
      onClose={closeShare}
      title={payload.title}
      url={payload.url}
      text={payload.text}
    />
  );
}

