import { CheckCircle, XCircle } from "lucide-react";

const StatusCard = ({ status }) => {
  return (
    <div
      className={`flex items-center gap-2 font-semibold ${
        status === "PAID" ? "text-green-600" : "text-red-600"
      }`}
    >
      {status === "PAID" ? (
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
