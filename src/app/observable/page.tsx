import ChartPage from "@/components/ChartPage";
import { LibraryType } from "@/util/types";

export default function Page() {
    return (
        <ChartPage
            libraryType={LibraryType.Observable}
        />
    )
}