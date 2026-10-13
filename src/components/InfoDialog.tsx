import { useEffect, useRef } from 'react'
import { FiX } from 'react-icons/fi'

type InfoDialogProps = { title: string; message: string; onClose: () => void }

export function InfoDialog({ title, message, onClose }: InfoDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  useEffect(() => { dialogRef.current?.showModal() }, [])

  return (
    <dialog ref={dialogRef} onClose={onClose} aria-labelledby="info-dialog-title"
      onClick={event => { if (event.target === event.currentTarget) dialogRef.current?.close() }}
      className="fixed inset-0 m-auto w-[calc(100%-40px)] max-w-md rounded-2xl border border-[#e4e8f0] bg-white p-7 text-navy shadow-xl backdrop:bg-[#10264f66]">
      <div className="flex items-start justify-between gap-4">
        <h2 id="info-dialog-title" className="text-xl font-bold">{title}</h2>
        <button type="button" onClick={() => dialogRef.current?.close()} className="rounded-full p-1 hover:bg-slate-100" aria-label="Close dialog"><FiX className="size-5" /></button>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted">{message}</p>
    </dialog>
  )
}
