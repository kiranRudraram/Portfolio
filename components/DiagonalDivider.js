// components/DiagonalDivider.js
export default function DiagonalDivider({ reverse = false }) {
  // a 100×100 viewBox polygon; flip it if you want the angle sloping the other way
  const points = reverse ? '0,0 100,0 100,100' : '0,0 100,0 0,100'
  return (
    <svg
      className="block w-full h-16"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <polygon points={points} fill="#1F2937" />
    </svg>
  )
}
