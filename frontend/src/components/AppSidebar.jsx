import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from '../redux/api/usersApiSlice';
import { logout } from "../redux/features/auth/authSlice";
import { Home, ShoppingCart, Store, Heart, User, LogOut, LogIn, UserPlus } from "lucide-react";
import { } from "lucide-react";
import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";

// Menu items.
const items = [
    {
        title: "Inicio",
        url: "/",
        icon: Home,
    },
    {
        title: "Tienda",
        url: "/store",
        icon: Store,
    },
    {
        title: "Carrito",
        url: "/cart",
        icon: ShoppingCart,
    },
    {
        title: "Favoritos",
        url: "/favorites",
        icon: Heart,
    },
];

export function AppSidebar() {
    const { userInfo } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Sidebar>
            <SidebarHeader>
                <ModeToggle />
                <img src="../../src/assets/img/kroco-wa.png" alt="" />
            </SidebarHeader>
            <SidebarContent>
                <div className="flex flex-col h-full justify-around items-center space-y-4 mx-6 font-extrabold text-2xl">
                    {items.map((item) => (
                        <Link
                            to={item.url}
                            key={item.title}
                            className="text-center w-full py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                        >
                            {item.title}
                        </Link>
                    ))}
                </div>

                {/* Conditionally rendered links based on user authentication */}
                {userInfo ? (
                    <>
                        {userInfo.isAdmin && (
                            <>
                                <a href="/admin/dashboard">Dashboard</a>
                                <a href="/admin/productlist">Products</a>
                                <a href="/admin/categorylist">Category</a>
                                <a href="/admin/orderlist">Orders</a>
                                <a href="/admin/userlist">Users</a>
                            </>
                        )}
                    </>
                ) : (
                    null
                )}
            </SidebarContent>
            <SidebarFooter>
                <div className="flex justify-around items-center space-x-4 py-4">
                    {userInfo ? (
                        <>
                            <a
                                href="/profile"
                                className="flex items-center space-x-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-full transition-all"
                            >
                                <User className="h-5 w-5" />
                                <span>Mi perfil</span>
                            </a>
                            <button
                                onClick={logoutHandler}
                                className="flex items-center space-x-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-full transition-all"
                            >
                                <LogOut className="h-5 w-5" />
                                <span>Salir</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <a
                                href="/login"
                                className="flex items-center space-x-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-full transition-all"
                            >
                                <LogIn className="h-5 w-5" />
                                <span>Iniciar</span>
                            </a>
                            <a
                                href="/register"
                                className="flex items-center space-x-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-full transition-all"
                            >
                                <UserPlus className="h-5 w-5" />
                                <span>Registrar</span>
                            </a>
                        </>
                    )}
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
