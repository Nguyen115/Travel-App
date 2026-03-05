import { Card } from '@/components/ui/card';

interface StrikeLadderProps {
  strikeLevel?: number;
  maxStrikes?: number;
}

export function StrikeLadder({ strikeLevel = 0, maxStrikes = 3 }: StrikeLadderProps) {
  return (
    <Card className="rounded-2xl p-6 border-0 shadow-lg sticky top-24">
      <h3 className="font-serif text-xl text-foreground mb-4">Strike Ladder</h3>

      <div className="space-y-3 mb-6">
        {[1, 2, 3].map((strike) => (
          <div
            key={strike}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
              strikeLevel >= strike
                ? 'bg-destructive/10 border-2 border-destructive'
                : 'bg-muted'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                strikeLevel >= strike
                  ? 'bg-destructive text-destructive-foreground'
                  : 'bg-background text-muted-foreground'
              }`}
            >
              {strike}
            </div>
            <div className="flex-1">
              <div
                className={`font-medium ${
                  strikeLevel >= strike ? 'text-destructive' : 'text-muted-foreground'
                }`}
              >
                Strike {strike}
              </div>
              <div className="text-xs text-muted-foreground">
                {strike === 1 && 'Warning issued'}
                {strike === 2 && 'Trust badge frozen'}
                {strike === 3 && 'Account suspended'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">Progress</span>
          <span className="text-sm font-semibold text-foreground">
            {strikeLevel}/{maxStrikes}
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-destructive transition-all"
            style={{ width: `${(strikeLevel / maxStrikes) * 100}%` }}
          />
        </div>
      </div>
    </Card>
  );
}
