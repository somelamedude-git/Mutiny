"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Settings, Bell, Shield, CreditCard, Users, Trash2 } from "lucide-react"

export default function FounderSettingsPage() {
  // Notifications
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [weeklyDigest, setWeeklyDigest] = useState(true)
  const [fundingUpdates, setFundingUpdates] = useState(true)
  const [teamUpdates, setTeamUpdates] = useState(true)

  // Privacy
  const [profileVisibility, setProfileVisibility] = useState("public")
  const [showEmail, setShowEmail] = useState(false)
  const [allowMessages, setAllowMessages] = useState(true)

  // Account
  const [email, setEmail] = useState("alex@edgevisionlabs.com")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  return (
    <div className="mx-auto max-w-[800px] space-y-6">
      {/* Header */}
      <div className="rounded-xl bg-[#101113] p-5">
        <div className="flex items-center gap-3">
          <Settings className="h-6 w-6 text-white/60" />
          <div>
            <h1 className="text-xl font-semibold">Settings</h1>
            <p className="text-sm text-white/70 mt-1">Manage your account, notifications, and privacy.</p>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <Card className="bg-[#101113] border-[#1a1b1e]">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <SettingRow
            label="Email notifications"
            desc="Receive important updates via email."
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
          <SettingRow
            label="Push notifications"
            desc="Get notified about messages and updates."
            checked={pushNotifications}
            onCheckedChange={setPushNotifications}
          />
          <SettingRow
            label="Weekly digest"
            desc="Summary of your activity and opportunities."
            checked={weeklyDigest}
            onCheckedChange={setWeeklyDigest}
          />
          <SettingRow
            label="Funding updates"
            desc="Notifications about funding milestones and releases."
            checked={fundingUpdates}
            onCheckedChange={setFundingUpdates}
          />
          <SettingRow
            label="Team updates"
            desc="Messages and updates from team members."
            checked={teamUpdates}
            onCheckedChange={setTeamUpdates}
          />
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card className="bg-[#101113] border-[#1a1b1e]">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <div className="text-sm font-medium">Profile visibility</div>
            <div className="flex gap-2">
              {[
                { value: "public", label: "Public" },
                { value: "network", label: "Network only" },
                { value: "private", label: "Private" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setProfileVisibility(option.value)}
                  className={`text-xs rounded-md px-3 py-1.5 border transition ${
                    profileVisibility === option.value
                      ? "border-white/30 bg-white/[0.06]"
                      : "border-[#1a1b1e] text-white/80 hover:bg-white/[0.03]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className="text-xs text-white/60">
              Public profiles can be found by anyone. Network only shows to verified users.
            </div>
          </div>

          <SettingRow
            label="Show email address"
            desc="Display your email on your public profile."
            checked={showEmail}
            onCheckedChange={setShowEmail}
          />
          <SettingRow
            label="Allow direct messages"
            desc="Let other users message you directly."
            checked={allowMessages}
            onCheckedChange={setAllowMessages}
          />
        </CardContent>
      </Card>

      {/* Account */}
      <Card className="bg-[#101113] border-[#1a1b1e]">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <label className="text-xs text-white/60">Email address</label>
            <div className="flex gap-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#0f1012] border-[#1a1b1e]"
              />
              <Button variant="outline" className="border-[#1a1b1e] text-white hover:bg-white/[0.06] bg-transparent">
                Update
              </Button>
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-xs text-white/60">Change password</label>
            <div className="grid gap-2 sm:grid-cols-2">
              <Input
                type="password"
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="bg-[#0f1012] border-[#1a1b1e]"
              />
              <Input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-[#0f1012] border-[#1a1b1e]"
              />
            </div>
            <Button
              variant="outline"
              className="w-fit border-[#1a1b1e] text-white hover:bg-white/[0.06] bg-transparent"
              disabled={!currentPassword || !newPassword}
            >
              Update password
            </Button>
          </div>

          <div className="pt-2">
            <div className="text-sm font-medium mb-2">Account status</div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-300 border-emerald-500/20">
                Verified
              </Badge>
              <span className="text-xs text-white/60">• Joined December 2023</span>
            </div>
          </div>
        </CardContent>
      </Card>

      

      {/* Danger zone */}
      <Card className="bg-[#101113] border-red-500/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2 text-red-300">
            <Trash2 className="h-4 w-4" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded-md border border-red-500/20 bg-red-500/5 p-3">
            <div className="text-sm font-medium text-red-300">Delete account</div>
            <div className="text-xs text-white/60 mt-1">
              Permanently delete your account and all associated data. This cannot be undone.
            </div>
            <Button
              variant="outline"
              className="mt-3 border-red-500/30 text-red-300 hover:bg-red-500/10 bg-transparent"
            >
              Delete account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function SettingRow({
  label,
  desc,
  checked,
  onCheckedChange,
}: {
  label: string
  desc?: string
  checked: boolean
  onCheckedChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-md border border-[#1a1b1e] bg-[#0f1012] p-3">
      <div className="min-w-0">
        <div className="font-medium text-sm">{label}</div>
        {desc && <div className="text-xs text-white/60">{desc}</div>}
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} aria-label={label} />
    </div>
  )
}
