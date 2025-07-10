import { getStatusColor, getStatusText, getStatusTextColor } from "@/types/status.type";

export default function BlockStatusCard({
    status,
    cuisine,
}: {
    status: string;
    cuisine?: string;
}) {
    if (!status) return null;

    return (
        <div className="flex flex-wrap gap-1">
            <div
                className={`px-2 py-1 rounded-lg ${getStatusColor(
                    status
                )} min-w-[80px] max-w-[120px] flex items-center justify-center`}
            >
                <p className={`text-[10px] sm:text-[12px] font-medium truncate text-center ${getStatusTextColor(status)}`}>
                    {getStatusText(status)}
                </p>
            </div>
            {cuisine === "belarussian" && (
                <div className="px-2 py-1 rounded-lg bg-white border border-black min-w-[100px] max-w-[140px] flex items-center justify-center">
                    <p className="text-[10px] sm:text-[12px] text-black font-medium truncate text-center">
                        Белорусская кухня
                    </p>
                </div>
            )}
        </div>
    );
}
