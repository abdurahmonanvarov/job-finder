import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FaTelegramPlane, FaInstagram } from "react-icons/fa";

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
}

const ShareModal = ({ open, onClose }: ShareModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm bottom-0 fixed inset-x-0 mb-4 mx-auto rounded-t-2xl">
        <div className="flex flex-col items-center space-y-4">
          <h3 className="font-semibold text-lg">Ulashish</h3>
          <div className="flex gap-6 text-3xl">
            <a
              href="https://t.me/share/url?url=https://jobfinder.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              <FaTelegramPlane />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-600"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
