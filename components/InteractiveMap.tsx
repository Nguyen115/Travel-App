'use client';

import { useState, useEffect } from 'react';
import { Coffee, Camera, UtensilsCrossed, MapPin, Navigation as NavigationIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MapActivity {
  id: string;
  placeName: string;
  category: string;
  day: number;
  time: string;
  coordinates?: { x: number; y: number };
}

interface InteractiveMapProps {
  activities: MapActivity[];
  selectedActivity?: string | null;
  onActivityClick?: (activityId: string) => void;
  showNavigation?: string | null;
  hoveredPlaceId?: string | null;
}

const categoryIcons: Record<string, any> = {
  food: UtensilsCrossed,
  cafe: Coffee,
  tourist: Camera,
  default: MapPin,
};

const categoryColors: Record<string, string> = {
  food: 'bg-orange-500',
  cafe: 'bg-amber-600',
  tourist: 'bg-blue-500',
  default: 'bg-primary',
};

export function InteractiveMap({
  activities,
  selectedActivity,
  onActivityClick,
  showNavigation,
  hoveredPlaceId
}: InteractiveMapProps) {
  const [mapActivities, setMapActivities] = useState<MapActivity[]>([]);
  const currentLocation = { x: 30, y: 70 };

  useEffect(() => {
    const activitiesWithCoords = activities.map((activity, index) => {
      if (!activity.coordinates) {
        const angle = (index / activities.length) * Math.PI * 2;
        const radius = 25 + Math.random() * 20;
        return {
          ...activity,
          coordinates: {
            x: 50 + Math.cos(angle) * radius,
            y: 50 + Math.sin(angle) * radius,
          },
        };
      }
      return activity;
    });
    setMapActivities(activitiesWithCoords);
  }, [activities]);

  const getNavigatedActivity = () => {
    return mapActivities.find(a => a.id === showNavigation);
  };

  const navigatedActivity = getNavigatedActivity();

  return (
    <div className="relative w-full h-full bg-stone-100 rounded-2xl overflow-hidden border border-border/50">
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(78, 115, 96, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(78, 115, 96, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}>
      </div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <filter id="shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
          </filter>
        </defs>

        {navigatedActivity && (
          <>
            <line
              x1={`${currentLocation.x}%`}
              y1={`${currentLocation.y}%`}
              x2={`${navigatedActivity.coordinates?.x}%`}
              y2={`${navigatedActivity.coordinates?.y}%`}
              stroke="#4E7360"
              strokeWidth="3"
              strokeDasharray="8,8"
              strokeLinecap="round"
              opacity="0.7"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="16"
                to="0"
                dur="1s"
                repeatCount="indefinite"
              />
            </line>

            <circle
              cx={`${(currentLocation.x + navigatedActivity.coordinates!.x) / 2}%`}
              cy={`${(currentLocation.y + navigatedActivity.coordinates!.y) / 2}%`}
              r="20"
              fill="white"
              filter="url(#shadow)"
            />
            <foreignObject
              x={`${(currentLocation.x + navigatedActivity.coordinates!.x) / 2 - 3}%`}
              y={`${(currentLocation.y + navigatedActivity.coordinates!.y) / 2 - 2.5}%`}
              width="6%"
              height="5%"
            >
              <div className="flex items-center justify-center h-full">
                <Badge className="text-xs whitespace-nowrap px-2">
                  15 min drive
                </Badge>
              </div>
            </foreignObject>
          </>
        )}
      </svg>

      <div
        className="absolute w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg z-10"
        style={{
          left: `${currentLocation.x}%`,
          top: `${currentLocation.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-50" />
      </div>

      {mapActivities.map((activity, index) => {
        const Icon = categoryIcons[activity.category] || categoryIcons.default;
        const colorClass = categoryColors[activity.category] || categoryColors.default;
        const isSelected = selectedActivity === activity.id;
        const isHovered = hoveredPlaceId === activity.id;

        return (
          <div
            key={activity.id}
            className={`absolute transition-all duration-300 ${
              isHovered ? 'scale-125 z-30' : isSelected ? 'scale-125 z-20' : 'scale-100 z-20'
            }`}
            style={{
              left: `${activity.coordinates?.x}%`,
              top: `${activity.coordinates?.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <button
              onClick={() => onActivityClick?.(activity.id)}
              className={`
                relative w-12 h-12 rounded-full text-white
                flex items-center justify-center group
                transition-all duration-300
                ${isHovered
                  ? 'bg-primary shadow-[0_0_15px_rgba(193,124,91,0.5)]'
                  : `${colorClass} shadow-lg hover:shadow-xl hover:scale-110`
                }
              `}
            >
              <Icon className="w-6 h-6" />

              <div className="absolute top-0 right-0 w-5 h-5 bg-white rounded-full flex items-center justify-center text-xs font-bold text-foreground border-2 border-current">
                {activity.day}
              </div>
            </button>

            {isHovered && (
              <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in zoom-in-95">
                <div className="space-y-3">
                  <div className="w-full h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-12 h-12 text-primary/50" />
                  </div>

                  <div>
                    <h3 className="font-serif text-lg leading-tight text-foreground">
                      {activity.placeName}
                    </h3>
                    <div className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
                      <span className="capitalize font-medium">{activity.category}</span>
                      <span>•</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>

                <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white" />
              </div>
            )}

            {!isHovered && (
              <div className={`
                absolute top-full left-1/2 -translate-x-1/2 mt-2
                bg-white rounded-xl shadow-lg p-3 min-w-max
                opacity-0 group-hover:opacity-100 pointer-events-none
                transition-opacity duration-200 z-30
              `}>
                <div className="text-sm font-semibold text-foreground">
                  {activity.placeName}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Day {activity.day} • {activity.time}
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2">
          <MapPin className="w-4 h-4 mr-2" />
          {activities.length} {activities.length === 1 ? 'place' : 'places'} added
        </Badge>
      </div>

      <div className="absolute bottom-4 right-4 z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-muted-foreground">Your location</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full" />
              <span className="text-muted-foreground">Destinations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
