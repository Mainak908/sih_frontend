import React from "react";

const loading = () => {
  return (
    <div class="flex items-center justify-center h-screen">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );
};

export default loading;
