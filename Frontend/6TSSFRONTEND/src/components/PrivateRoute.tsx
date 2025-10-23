import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Spinner } from "@/components/ui/spinner"

import type { User } from '@supabase/supabase-js';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps{
  allowedRoles: string[],
  children: React.ReactNode,
  user: User | null
  userRole: string
  loading: boolean

}

const PrivateRoute = ({ children, allowedRoles, user, userRole, loading}: PrivateRouteProps) => {

  if (loading){
    return(
      <div className="flex w-full max-w-xs flex-col gap-4 [--radius:1rem] items-center justify-center h-screen">
      <Item variant="muted">
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">Loading...</ItemTitle>
        </ItemContent>
      </Item>
    </div>
    )
  }

  if (!user) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Logged in but unauthorized userrole, redirect to a suitable page (e.g., home or unauthorized page)
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;