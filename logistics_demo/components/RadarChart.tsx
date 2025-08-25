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
            'Appointment\nVolume',
            'Provider\nBalance', 
            'Travel\nEfficiency',
            'Continuity\nof Care'
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
                    size: 11
                  },
                  callback: function(value: any, index: number) {
                    const labels = [
                      'Appointment\nVolume',
                      'Provider\nBalance', 
                      'Travel\nEfficiency',
                      'Continuity\nof Care'
                    ]
                    return labels[index].split('\n')
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
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      {/* Radar Chart */}
      <div className="relative w-48 h-48 mb-6">
        <canvas ref={chartRef} />
      </div>
      
      {/* Metric Cards */}
      <div className="w-full flex gap-4">
        {/* Appointments Card */}
        <div className="flex-1 bg-dark-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-white mb-1">62</div>
          <div className="text-sm text-green-400 mb-1">+27.2% from baseline</div>
          <div className="text-xs text-gray-300">Appointments Scheduled</div>
        </div>
        
        {/* Travel Time Card */}
        <div className="flex-1 bg-dark-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-white mb-1">746 min</div>
          <div className="text-sm text-green-400 mb-1">-151.3% from baseline</div>
          <div className="text-xs text-gray-300">Total Travel Time</div>
        </div>
      </div>
    </div>
  )
}
