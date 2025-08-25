declare module 'wx-react-gantt' {
  interface GanttTask {
    id: string | number
    text: string
    start_date: string
    end_date: string
    progress: number
    parent: string | number
    type: string
    open?: boolean
  }

  interface GanttLink {
    id: string | number
    source: string | number
    target: string | number
    type: string
  }

  interface GanttColumn {
    name: string
    label: string
    width: number
  }

  interface GanttProps {
    tasks: GanttTask[]
    links: GanttLink[]
    height?: string | number
    width?: string | number
    columns?: GanttColumn[]
    onTaskClick?: (id: string | number, e: any) => void
    onLinkClick?: (id: string | number, e: any) => void
  }

  export const Gantt: React.FC<GanttProps>
}
