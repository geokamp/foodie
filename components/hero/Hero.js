const links = [
    { name: 'Open roles', href: '#' },
    { name: 'Internship program', href: '#' },
    { name: 'Our values', href: '#' },
    { name: 'Meet our leadership', href: '#' },
  ]
  const stats = [
    { name: 'Offices worldwide', value: '12' },
    { name: 'Full-time colleagues', value: '300+' },
    { name: 'Hours per week', value: '40' },
    { name: 'Paid time off', value: 'Unlimited' },
  ]
  
  export default function Hero() {
    return (
      <div className="relative isolate h-dvh overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img
          alt=""
          src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg"
          className="absolute inset-0 -z-10 size-full object-cover object-right md:object-center"
        />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-5xl font-semibold tracking-tight text-amber-800 sm:text-7xl">Eat with us</h2>
            <p className="mt-8 text-lg font-medium text-pretty text-amber-700 sm:text-xl/8">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
              fugiat veniam occaecat fugiat.
            </p>
          </div>
        </div>
      </div>
    )
  }
  