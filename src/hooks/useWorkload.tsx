import getWorkload from "../services/reviewer/getWorkload";
import useHttpRequest from "./useHttpRequest";

export default function useWorkload(onComplete: (value: any) => void, dependencyList?: React.DependencyList | undefined) {
    useHttpRequest(
        getWorkload(),
        onComplete,
        dependencyList
    )
}
