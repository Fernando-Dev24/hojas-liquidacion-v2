import PDFLogo from '../../../../public/mined-logo.png'

interface Props {
  children: React.ReactNode
}

export const DocHeader = ({ children }: Props) => {
  return (
    <header className="flex justify-center items-center gap-x-16">
      {/* LOGO */}
      <figure className="w-[25%]">
        <img src={PDFLogo} alt="MINED LOGO" className="w-full" />
      </figure>

      <div className="text-center text-secondary font-medium">{children}</div>
    </header>
  )
}
