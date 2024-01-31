const AuthLayout = ({
    children
  }: {
    children: React.ReactNode;
  }) => {
    return ( 
      <main className="h-full sc bg-[#8aa8e7] flex items-center justify-center">
        {children}
      </main>
    );
  }
   
  export default AuthLayout;