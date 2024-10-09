import { mainStore } from "@/store/store";
import { Provider } from "react-redux";

export default function ReduxProvider({children}){
    
    return <Provider store={mainStore}>
            {children}
    </Provider>

}