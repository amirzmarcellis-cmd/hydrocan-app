// Hydrocan v2 — generated via Supabase MCP `generate_typescript_types`.
// Regenerate with:
//   npx supabase gen types typescript --project-id huqgmullrfcrpvimejqt > src/lib/database.types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: { PostgrestVersion: '14.5' };
  public: {
    Tables: {
      profiles: {
        Row: {
          accent_hex: string;
          baseline_confident_at: string | null;
          city: string | null;
          coach_voice: string;
          created_at: string;
          customer_tier: string | null;
          date_of_birth: string | null;
          display_name: string | null;
          goal_cans_per_day: number;
          id: string;
          manual_mode: boolean;
          onboarding_completed_at: string | null;
          push_token: string | null;
          sex: string | null;
          signup_at: string;
          updated_at: string;
        };
        Insert: {
          accent_hex?: string;
          baseline_confident_at?: string | null;
          city?: string | null;
          coach_voice?: string;
          created_at?: string;
          customer_tier?: string | null;
          date_of_birth?: string | null;
          display_name?: string | null;
          goal_cans_per_day?: number;
          id: string;
          manual_mode?: boolean;
          onboarding_completed_at?: string | null;
          push_token?: string | null;
          sex?: string | null;
          signup_at?: string;
          updated_at?: string;
        };
        Update: {
          accent_hex?: string;
          baseline_confident_at?: string | null;
          city?: string | null;
          coach_voice?: string;
          created_at?: string;
          customer_tier?: string | null;
          date_of_birth?: string | null;
          display_name?: string | null;
          goal_cans_per_day?: number;
          id?: string;
          manual_mode?: boolean;
          onboarding_completed_at?: string | null;
          push_token?: string | null;
          sex?: string | null;
          signup_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      connected_sources: {
        Row: {
          connected_at: string;
          last_synced_at: string | null;
          raw: Json;
          source: string;
          user_id: string;
        };
        Insert: {
          connected_at?: string;
          last_synced_at?: string | null;
          raw?: Json;
          source: string;
          user_id: string;
        };
        Update: {
          connected_at?: string;
          last_synced_at?: string | null;
          raw?: Json;
          source?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      signals_daily: {
        Row: {
          active_calories: number | null;
          date: string;
          hrv_ms: number | null;
          raw: Json;
          resp_rate: number | null;
          resting_hr: number | null;
          sleep_efficiency: number | null;
          sleep_minutes: number | null;
          sources: string[];
          steps: number | null;
          strain: number | null;
          synced_at: string;
          user_id: string;
        };
        Insert: {
          active_calories?: number | null;
          date: string;
          hrv_ms?: number | null;
          raw?: Json;
          resp_rate?: number | null;
          resting_hr?: number | null;
          sleep_efficiency?: number | null;
          sleep_minutes?: number | null;
          sources?: string[];
          steps?: number | null;
          strain?: number | null;
          synced_at?: string;
          user_id: string;
        };
        Update: {
          active_calories?: number | null;
          date?: string;
          hrv_ms?: number | null;
          raw?: Json;
          resp_rate?: number | null;
          resting_hr?: number | null;
          sleep_efficiency?: number | null;
          sleep_minutes?: number | null;
          sources?: string[];
          steps?: number | null;
          strain?: number | null;
          synced_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      cans_logged: {
        Row: {
          can_id: string;
          consumed_at: string;
          context: string[];
          created_at: string;
          feel_score: number | null;
          id: string;
          ml: number;
          source: string;
          user_id: string;
        };
        Insert: {
          can_id: string;
          consumed_at?: string;
          context?: string[];
          created_at?: string;
          feel_score?: number | null;
          id?: string;
          ml?: number;
          source?: string;
          user_id: string;
        };
        Update: {
          can_id?: string;
          consumed_at?: string;
          context?: string[];
          created_at?: string;
          feel_score?: number | null;
          id?: string;
          ml?: number;
          source?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      ritual_logs: {
        Row: {
          created_at: string;
          date: string;
          energy: number | null;
          mood: number | null;
          notes: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          date: string;
          energy?: number | null;
          mood?: number | null;
          notes?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          date?: string;
          energy?: number | null;
          mood?: number | null;
          notes?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      recovery_scores: {
        Row: {
          composite_z: number | null;
          computed_at: string;
          date: string;
          score: number;
          user_id: string;
          z_hrv: number | null;
          z_resp: number | null;
          z_rhr: number | null;
          z_sleep_eff: number | null;
        };
        Insert: {
          composite_z?: number | null;
          computed_at?: string;
          date: string;
          score: number;
          user_id: string;
          z_hrv?: number | null;
          z_resp?: number | null;
          z_rhr?: number | null;
          z_sleep_eff?: number | null;
        };
        Update: {
          composite_z?: number | null;
          computed_at?: string;
          date?: string;
          score?: number;
          user_id?: string;
          z_hrv?: number | null;
          z_resp?: number | null;
          z_rhr?: number | null;
          z_sleep_eff?: number | null;
        };
        Relationships: [];
      };
      h2_effect_daily: {
        Row: {
          ci: string | null;
          computed_at: string;
          date: string;
          n_off: number | null;
          n_on: number | null;
          parts: Json;
          pct: number | null;
          user_id: string;
        };
        Insert: {
          ci?: string | null;
          computed_at?: string;
          date: string;
          n_off?: number | null;
          n_on?: number | null;
          parts?: Json;
          pct?: number | null;
          user_id: string;
        };
        Update: {
          ci?: string | null;
          computed_at?: string;
          date?: string;
          n_off?: number | null;
          n_on?: number | null;
          parts?: Json;
          pct?: number | null;
          user_id?: string;
        };
        Relationships: [];
      };
      findings_daily: {
        Row: {
          body: string | null;
          created_at: string;
          date: string;
          eyebrow: string | null;
          good: boolean | null;
          headline: string;
          kind: string;
          metric: string | null;
          tag: string | null;
          user_id: string;
        };
        Insert: {
          body?: string | null;
          created_at?: string;
          date: string;
          eyebrow?: string | null;
          good?: boolean | null;
          headline: string;
          kind: string;
          metric?: string | null;
          tag?: string | null;
          user_id: string;
        };
        Update: {
          body?: string | null;
          created_at?: string;
          date?: string;
          eyebrow?: string | null;
          good?: boolean | null;
          headline?: string;
          kind?: string;
          metric?: string | null;
          tag?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      user_baselines: {
        Row: {
          hrv_baseline: number | null;
          hrv_std: number | null;
          last_computed: string | null;
          no_h2_recovery_baseline: number | null;
          resp_baseline: number | null;
          resp_std: number | null;
          rhr_baseline: number | null;
          rhr_std: number | null;
          sample_size: number;
          sleep_eff_baseline: number | null;
          sleep_eff_std: number | null;
          user_id: string;
        };
        Insert: {
          hrv_baseline?: number | null;
          hrv_std?: number | null;
          last_computed?: string | null;
          no_h2_recovery_baseline?: number | null;
          resp_baseline?: number | null;
          resp_std?: number | null;
          rhr_baseline?: number | null;
          rhr_std?: number | null;
          sample_size?: number;
          sleep_eff_baseline?: number | null;
          sleep_eff_std?: number | null;
          user_id: string;
        };
        Update: {
          hrv_baseline?: number | null;
          hrv_std?: number | null;
          last_computed?: string | null;
          no_h2_recovery_baseline?: number | null;
          resp_baseline?: number | null;
          resp_std?: number | null;
          rhr_baseline?: number | null;
          rhr_std?: number | null;
          sample_size?: number;
          sleep_eff_baseline?: number | null;
          sleep_eff_std?: number | null;
          user_id?: string;
        };
        Relationships: [];
      };
      coach_threads: {
        Row: { created_at: string; id: string; user_id: string; voice: string };
        Insert: { created_at?: string; id?: string; user_id: string; voice?: string };
        Update: { created_at?: string; id?: string; user_id?: string; voice?: string };
        Relationships: [];
      };
      coach_messages: {
        Row: {
          citations: Json;
          content: string;
          created_at: string;
          id: string;
          role: string;
          thread_id: string;
          user_id: string;
        };
        Insert: {
          citations?: Json;
          content: string;
          created_at?: string;
          id?: string;
          role: string;
          thread_id: string;
          user_id: string;
        };
        Update: {
          citations?: Json;
          content?: string;
          created_at?: string;
          id?: string;
          role?: string;
          thread_id?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      reminders: {
        Row: {
          created_at: string;
          description: string | null;
          enabled: boolean;
          id: string;
          slot: string;
          time_local: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          enabled?: boolean;
          id?: string;
          slot: string;
          time_local: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          enabled?: boolean;
          id?: string;
          slot?: string;
          time_local?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      inbox: {
        Row: {
          body: string | null;
          created_at: string;
          data: Json;
          id: string;
          kind: string;
          read_at: string | null;
          title: string;
          user_id: string;
        };
        Insert: {
          body?: string | null;
          created_at?: string;
          data?: Json;
          id?: string;
          kind: string;
          read_at?: string | null;
          title: string;
          user_id: string;
        };
        Update: {
          body?: string | null;
          created_at?: string;
          data?: Json;
          id?: string;
          kind?: string;
          read_at?: string | null;
          title?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          cans_per_month: number;
          current_period_end: string | null;
          current_period_start: string | null;
          external_id: string | null;
          external_provider: string | null;
          next_delivery_date: string | null;
          paused_until: string | null;
          status: string;
          tier: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          cans_per_month: number;
          current_period_end?: string | null;
          current_period_start?: string | null;
          external_id?: string | null;
          external_provider?: string | null;
          next_delivery_date?: string | null;
          paused_until?: string | null;
          status?: string;
          tier: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          cans_per_month?: number;
          current_period_end?: string | null;
          current_period_start?: string | null;
          external_id?: string | null;
          external_provider?: string | null;
          next_delivery_date?: string | null;
          paused_until?: string | null;
          status?: string;
          tier?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      cohort_aggregates: {
        Row: {
          city: string | null;
          computed_at: string;
          display_name: string;
          id: string;
          n_days: number;
          pct: number;
          user_id: string | null;
          week_start: string;
        };
        Insert: {
          city?: string | null;
          computed_at?: string;
          display_name: string;
          id?: string;
          n_days: number;
          pct: number;
          user_id?: string | null;
          week_start: string;
        };
        Update: {
          city?: string | null;
          computed_at?: string;
          display_name?: string;
          id?: string;
          n_days?: number;
          pct?: number;
          user_id?: string | null;
          week_start?: string;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];
