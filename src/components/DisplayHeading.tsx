interface DisplayHeadingProps {
  id?: string
  before?: string
  emphasis: string
  after?: string
  as?: 'h1' | 'h2'
}

export function DisplayHeading({
  id,
  before,
  emphasis,
  after,
  as: Tag = 'h2',
}: DisplayHeadingProps) {
  return (
    <Tag id={id} className="display-heading">
      {before}
      {before ? ' ' : null}
      <em>{emphasis}</em>
      {after ? ` ${after}` : null}
    </Tag>
  )
}
