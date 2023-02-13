export default function listenForOutsideClicks(
  listening: any,
  setListening: (arg0: boolean) => void,
  menuRef: any,
  setIsOpen: (arg0: boolean) => void,
) {
  return () => {
    if (listening) return
    if (!menuRef.current) return
    setListening(true)
    ;[`click`, `touchstart`].forEach((type) => {
      document.addEventListener(`click`, (evt) => {
        const cur = menuRef?.current
        const node = evt.target
        if (cur?.contains(node)) return
        setIsOpen(false)
      })
    })
  }
}
