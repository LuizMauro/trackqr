import { Outlet } from 'react-router-dom';

export function PublicLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Outlet />
    </div>
  );
}