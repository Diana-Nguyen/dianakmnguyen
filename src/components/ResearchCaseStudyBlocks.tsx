import type { CaseStudyBlock, CaseStudyEmbedItem, CaseStudyFigureItem } from '../data/types'
import { assetUrl } from '../utils/assetUrl'
import { ContentPageBulletList } from './content-page/ContentPage'
import { PdfViewer } from './PdfViewer'

interface ResearchCaseStudyBlocksProps {
  slug: string
  sectionId: string
  blocks: CaseStudyBlock[]
}

function EmbedBlock({ block }: { block: Extract<CaseStudyBlock, { type: 'embed' }> }) {
  return (
    <div className="research-study__embed">
      <iframe
        src={assetUrl(block.src)}
        title={block.title}
        height={block.height ?? 640}
        loading="lazy"
        allowFullScreen
      />
      <p className="research-study__embed-link mono-label">
        <a
          href={assetUrl(block.linkHref ?? block.src)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {block.linkLabel ?? 'Open prototype in Axure Cloud →'}
        </a>
      </p>
    </div>
  )
}

function EmbedItem({
  item,
  height,
}: {
  item: CaseStudyEmbedItem
  height: number
}) {
  return (
    <div className="research-study__embed-item">
      {item.label ? (
        <p className="mono-label research-study__embed-label">{item.label}</p>
      ) : null}
      <iframe
        src={assetUrl(item.src)}
        title={item.title}
        height={height}
        loading="lazy"
        allowFullScreen
      />
      <p className="research-study__embed-link mono-label">
        <a
          href={assetUrl(item.linkHref ?? item.src)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.linkLabel ?? 'Open prototype in Axure Cloud →'}
        </a>
      </p>
    </div>
  )
}

function FigureItem({ item }: { item: CaseStudyFigureItem }) {
  return (
    <figure className="research-study__figure">
      {item.label ? (
        <p className="mono-label research-study__figure-label">{item.label}</p>
      ) : null}
      <img src={assetUrl(item.src)} alt={item.alt} loading="lazy" decoding="async" />
      {item.caption ? <figcaption>{item.caption}</figcaption> : null}
    </figure>
  )
}

export function ResearchCaseStudyBlocks({
  slug,
  sectionId,
  blocks,
}: ResearchCaseStudyBlocksProps) {
  return (
    <>
      {blocks.map((block, index) => {
        const key = `${slug}-${sectionId}-${index}`

        switch (block.type) {
          case 'paragraph':
            return <p key={key}>{block.text}</p>
          case 'list':
            return (
              <ContentPageBulletList
                key={key}
                slug={slug}
                sectionId={`${sectionId}-${index}`}
                items={block.items}
              />
            )
          case 'figure':
            return (
              <figure key={key} className="research-study__figure">
                <img
                  src={assetUrl(block.src)}
                  alt={block.alt}
                  loading="lazy"
                  decoding="async"
                />
                {block.caption ? (
                  <figcaption>{block.caption}</figcaption>
                ) : null}
              </figure>
            )
          case 'figurePair':
            return (
              <div key={key} className="research-study__pair">
                {block.items.map((item) => (
                  <FigureItem key={`${key}-${item.src}`} item={item} />
                ))}
              </div>
            )
          case 'embed':
            return <EmbedBlock key={key} block={block} />
          case 'embedPair':
            return (
              <div key={key} className="research-study__pair">
                {block.items.map((item) => (
                  <EmbedItem
                    key={`${key}-${item.src}`}
                    item={item}
                    height={block.height ?? 640}
                  />
                ))}
              </div>
            )
          case 'pdf':
            return (
              <PdfViewer
                key={key}
                src={block.src}
                title={block.title}
                caption={block.caption}
                linkHref={block.linkHref}
                linkLabel={block.linkLabel}
                defaultZoom={block.defaultZoom}
              />
            )
        }
      })}
    </>
  )
}
