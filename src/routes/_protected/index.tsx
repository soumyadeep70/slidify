import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
  Sparkles, FileText, BarChart2, Megaphone, Users,
  ArrowRight, Sliders, ChevronDown, Wand2, AlignLeft,
  LayoutGrid, Layers, Package, Rocket, Presentation
} from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Textarea } from '#/components/ui/textarea'
import { Slider } from '#/components/ui/slider'
import { Badge } from '#/components/ui/badge'
import { Label } from '#/components/ui/label'
import { Separator } from '#/components/ui/separator'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '#/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '#/components/ui/tooltip'
import { cn } from '#/lib/utils'
import { audienceOptions, layoutOptions, SlideAudience, SlideLayout, SlideTone, toneOptions } from '#/features/presentation/constants/presentation-options'
import { SlideTemplate, templateOptions } from '#/features/presentation/constants/presentation-templates'

export const Route = createFileRoute('/_protected/')({
  component: Dashboard,
})

const layoutIcons = {
  [SlideLayout.MINIMAL]: AlignLeft,
  [SlideLayout.VISUAL]: LayoutGrid,
  [SlideLayout.DENSE]: Layers,
}

const templateIcons = {
  [SlideTemplate.PRODUCT_TOUR]: Package,
  [SlideTemplate.MEETING_SUMMARY]: FileText,
  [SlideTemplate.SALES_PITCH]: Megaphone,
  [SlideTemplate.PROJECT_UPDATE]: BarChart2,
  [SlideTemplate.STARTUP_PITCH]: Rocket,
  [SlideTemplate.TRAINING_UPDATE]: Presentation,
}

interface FormState {
  prompt: string,
  slides: number,
  tone: SlideTone,
  audience: SlideAudience,
  layout: SlideLayout,
}

function Dashboard() {
  const [form, setForm] = useState<FormState>({
    prompt: '',
    slides: 8,
    tone: SlideTone.PROFESSIONAL,
    audience: SlideAudience.GENERAL,
    layout: SlideLayout.MINIMAL,
  })

  const [showAdvanced, setShowAdvanced] = useState(false)

  const canGenerate = form.prompt.trim().length > 0

  return (
    <TooltipProvider delayDuration={300}>
      <div className="min-h-screen bg-background">
        {/* ── Background texture ── */}
        <div
          className="pointer-events-none fixed inset-0 -z-10 opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, hsl(var(--primary) / 0.08) 0%, transparent 50%),
                              radial-gradient(circle at 80% 80%, hsl(var(--primary) / 0.06) 0%, transparent 50%)`,
          }}
        />

        <main className="mx-auto max-w-3xl">

          {/* ── Header ── */}
          <div className="mb-10 text-center">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              What do you want to create?
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              Describe your idea and we'll build a polished deck in seconds.
            </p>
          </div>

          {/* ── Prompt card ── */}
          <div className="rounded-2xl border border-border bg-card shadow-sm">

            {/* Textarea */}
            <div className="p-4">
              <Textarea
                value={form.prompt}
                onChange={(e) => setForm({
                  ...form,
                  prompt: e.target.value
                })}
                placeholder="e.g. A pitch deck for a B2B SaaS tool that helps remote teams track async work..."
                className="min-h-30 max-h-70 overflow-y-auto resize-none border bg-transparent p-3 text-base shadow-none focus-visible:ring placeholder:text-muted-foreground/50"
                maxLength={600}
              />
              <div className="mt-1 flex items-center justify-between">
                <span className="text-xs text-muted-foreground/60">
                  {form.prompt.length}/600
                </span>
              </div>
            </div>

            <Separator />

            {/* Template pills */}
            <div className="p-4">
              <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Quick start
              </p>
              <div className="flex flex-wrap gap-2">
                {templateOptions.map((t) => {
                  const Icon = templateIcons[t.value]
                  const active = form.prompt === t.prompt
                  return (
                    <button
                      key={t.label}
                      onClick={() => setForm({ ...form, tone: t.tone, audience: t.audience, layout: t.layout, prompt: t.prompt })}
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-150',
                        active
                          ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                          : 'border-border bg-background text-muted-foreground hover:border-primary/40 hover:bg-muted hover:text-foreground'
                      )}
                    >
                      <Icon className="size-3" />
                      {t.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <Separator />

            {/* ── Core options row ── */}
            <div className="flex flex-wrap items-center gap-2 p-4">

              {/* Tone */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1.5 rounded-lg text-xs font-medium">
                    <Wand2 className="size-3.5 text-muted-foreground" />
                    {toneOptions.find((o) => o.value === form.tone)?.label}
                    <ChevronDown className="size-3 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-36">
                  {toneOptions.map((t) => (
                    <DropdownMenuItem
                      key={t.value}
                      onClick={() => setForm({ ...form, tone: t.value })}
                      className={cn('text-xs', form.tone === t.value && 'font-semibold text-primary')}
                    >
                      {t.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Audience */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1.5 rounded-lg text-xs font-medium">
                    <Users className="size-3.5 text-muted-foreground" />
                    {audienceOptions.find((o) => o.value === form.audience)?.label}
                    <ChevronDown className="size-3 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-36">
                  {audienceOptions.map((a) => (
                    <DropdownMenuItem
                      key={a.value}
                      onClick={() => setForm({ ...form, audience: a.value })}
                      className={cn('text-xs', form.audience === a.value && 'font-semibold text-primary')}
                    >
                      {a.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Advanced toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto h-8 gap-1.5 rounded-lg text-xs font-medium text-muted-foreground"
                onClick={() => setShowAdvanced((v) => !v)}
              >
                <Sliders className="size-3.5" />
                {showAdvanced ? 'Less' : 'More options'}
              </Button>
            </div>

            {/* ── Advanced options ── */}
            {showAdvanced && (
              <>
                <Separator />
                <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2">

                  {/* Slide count slider */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                        Slides
                      </Label>
                      <Badge variant="secondary" className="text-xs tabular-nums">
                        {form.slides}
                      </Badge>
                    </div>
                    <Slider
                      value={[form.slides]}
                      onValueChange={(v) => {setForm({...form, slides: v[0]})}}
                      min={4}
                      max={20}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground/60">
                      <span>4</span>
                      <span>20</span>
                    </div>
                  </div>

                  {/* Layout picker */}
                  <div className="space-y-3">
                    <Label className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                      Layout style
                    </Label>
                    <div className="flex gap-2">
                      {layoutOptions.map((l) => {
                        const Icon = layoutIcons[l.value]
                        return (
                          <Tooltip key={l.value}>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => setForm({ ...form, layout: l.value })}
                                className={cn(
                                  'flex flex-1 flex-col items-center gap-1 rounded-lg border py-2.5 text-xs font-medium transition-all',
                                  form.layout === l.value
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-border bg-background text-muted-foreground hover:border-border hover:bg-muted'
                                )}
                              >
                                <Icon className="size-4" />
                                {l.label}
                              </button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="text-xs">
                              {l.desc}
                            </TooltipContent>
                          </Tooltip>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}

            <Separator />

            {/* ── Footer / Generate ── */}
            <div className="flex items-center justify-between gap-3 p-4">
              <p className="text-xs text-muted-foreground">
                {form.slides} slides · {toneOptions.find((o) => o.value === form.tone)?.label} · {audienceOptions.find((o) => o.value === form.audience)?.label}
              </p>
              <Button
                size="default"
                disabled={!canGenerate}
                className="gap-2 rounded-xl px-6 font-semibold transition-all"
              >
                <Sparkles className="size-4" />
                Generate
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </TooltipProvider>
  )
}