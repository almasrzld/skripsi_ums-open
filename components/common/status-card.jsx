import { CheckCircle, XCircle } from "lucide-react";

const StatusCard = ({ status }) => {
  const isPaid = status === "settlement";

  return (
    <div
      className={`flex items-center gap-2 font-semibold ${
        isPaid ? "text-green-600" : "text-red-600"
      }`}
    >
      {isPaid ? (
        <>
          <CheckCircle className="w-5 h-5" />
          Lunas
        </>
      ) : (
        <>
          <XCircle className="w-5 h-5" />
          Pending
        </>
      )}
    </div>
  );
};

export default StatusCard;
