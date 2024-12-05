export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">            
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:mt-8" />
        <span class="block text-sm text-gray-500 text-center dark:text-gray-400">© {year}. Todos os Direitos Reservados.</span>
      </div>
    </footer>
  )
}