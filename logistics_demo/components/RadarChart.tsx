'use client'

import { useEffect, useRef } from 'react'
import { Chart, ChartConfiguration, ChartData } from 'chart.js/auto'
import { OptimizationData } from '../types'

interface RadarChartProps {
  data: OptimizationData
}

export default function RadarChart({ data }: RadarChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const ctx = chartRef.current.getContext('2d')
      if (ctx) {
        const chartData: ChartData<'radar'> = {
          labels: [
            'Appointment Volume',
            'Provider Balance', 
            'Travel Efficiency',
            'Continuity of Care'
          ],
          datasets: [
            {
              label: 'Recommended',
              data: [
                data.recommended.appointmentVolume,
                data.recommended.providerBalance,
                data.recommended.travelEfficiency,
                data.recommended.continuityOfCare
              ],
              backgroundColor: 'rgba(59, 130, 246, 0.2)',
              borderColor: 'rgba(59, 130, 246, 0.8)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(59, 130, 246, 1)',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 4
            },
            {
              label: 'Baseline',
              data: [
                data.baseline.appointmentVolume,
                data.baseline.providerBalance,
                data.baseline.travelEfficiency,
                data.baseline.continuityOfCare
              ],
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              borderColor: 'rgba(239, 68, 68, 0.8)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(239, 68, 68, 1)',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 4
            }
          ]
        }

        const config: ChartConfiguration<'radar'> = {
          type: 'radar',
          data: chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              r: {
                beginAtZero: true,
                max: 100,
                ticks: {
                  color: '#9ca3af',
                  backdropColor: 'transparent'
                },
                grid: {
                  color: 'rgba(59, 130, 246, 0.1)'
                },
                pointLabels: {
                  color: '#9ca3af',
                  font: {
                    size: 12
                  }
                }
              }
            }
          }
        }

        chartInstance.current = new Chart(ctx, config)
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data])

  return (
    <div className="w-full h-full p-4">
      <h3 className="text-lg font-semibold text-white mb-4">Recommended</h3>
      
      <div className="relative w-48 h-48 mx-auto">
        <canvas ref={chartRef} />
      </div>
      
      {/* Metrics summary */}
      <div className="mt-4 space-y-2">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">62</div>
          <div className="text-sm text-green-400">+27.2% from baseline</div>
          <div className="text-xs text-gray-400">Appointments Scheduled</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-white">746 min</div>
          <div className="text-sm text-green-400">-151.3% from baseline</div>
          <div className="text-xs text-gray-400">Total Travel Time</div>
        </div>
      </div>
    </div>
  )
}
