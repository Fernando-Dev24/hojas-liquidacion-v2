import PDFLogo from '../../../../public/mined-logo.png'

interface Props {
  children: React.ReactNode
}

export const DocHeader = ({ children }: Props) => {
  return (
    <header className="flex justify-between items-center">
      {/* LOGO */}
      <figure className="w-[25%]">
        <img src={PDFLogo} alt="MINED LOGO" className="w-full" />
      </figure>

      <div className="mr-25 text-center text-secondary font-medium">{children}</div>
    </header>
  )
}
