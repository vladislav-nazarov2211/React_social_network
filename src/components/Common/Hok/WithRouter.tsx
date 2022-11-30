import { useLocation, useNavigate, useParams } from "react-router-dom"

function WithRouter<WrapperProps>(Component: React.ComponentType<WrapperProps>) {
    function ComponentWithRouterProp(props: WrapperProps) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

export default WithRouter