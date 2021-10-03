const tetriminoClasses: any = {
  i: 'bg-tetrimino-i border-tetrimino-i-shadow',
  j: 'bg-tetrimino-j border-tetrimino-j-shadow',
  l: 'bg-tetrimino-l border-tetrimino-l-shadow',
  z: 'bg-tetrimino-z border-tetrimino-z-shadow',
  o: 'bg-tetrimino-o border-tetrimino-o-shadow',
  s: 'bg-tetrimino-s border-tetrimino-s-shadow',
  t: 'bg-tetrimino-t border-tetrimino-t-shadow',
  a: 'bg-tetrimino-a border-tetrimino-a-shadow',
}

export function getCellVariantClassname(cell: string | number) {
  const classes = 'w-8 h-8 lg:w-10 lg:h-10 border-8 border-outset '

  if (typeof cell !== 'string') {
    return classes + 'bg-transparent border-transparent'
  }

  const isLocation = cell.includes('_location')
  const formattedCellName = cell.replace('_fixed', '').replace('_location', '')

  return isLocation
    ? `${classes} ${tetriminoClasses[formattedCellName]} opacity-20`
    : `${classes} ${tetriminoClasses[formattedCellName]}`
}

export function getSpectrumCellVariantClassname(cell: string | number) {
  const isLocation = typeof cell === 'string' && cell.includes('_location')
  const colorClasses = cell !== 0 && !isLocation
    ? 'bg-gray-500 border-gray-700'
    : 'bg-transparent border-transparent'

  return 'w-4 h-4 opacity-50 ' + colorClasses
}

export function defaultEmptyBoard() {
  return [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]
}