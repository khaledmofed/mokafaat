import { t } from "i18next";

export const RatingNote = ({
  note,
  setNote,
}: {
  note: string;
  setNote: (value: string) => void;
}) => (
  <textarea
    id="rating-note"
    rows={4}
    value={note}
    onChange={(e) => setNote(e.target.value)}
    placeholder={t("rating.note")}
    className="p-3 rounded-lg w-full text-xs border wow fadeInUp"
    data-wow-delay="0.2s"
  />
);
