// Generated via Supabase MCP `generate_typescript_types`.
// Regenerate with: npx supabase gen types typescript --project-id huqgmullrfcrpvimejqt > src/lib/database.types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: '14.5';
  };
  public: {
    Tables: {
      can_logs: {
        Row: {
          consumed_at: string;
          context: string[];
          created_at: string;
          feel_score: number | null;
          id: string;
          location_lat: number | null;
          location_lng: number | null;
          quantity: number;
          synced_at: string | null;
          user_id: string;
        };
        Insert: {
          consumed_at: string;
          context?: string[];
          created_at?: string;
          feel_score?: number | null;
          id?: string;
          location_lat?: number | null;
          location_lng?: number | null;
          quantity?: number;
          synced_at?: string | null;
          user_id: string;
        };
        Update: Partial<Database['public']['Tables']['can_logs']['Insert']>;
        Relationships: [];
      };
      challenge_participants: {
        Row: {
          challenge_id: string;
          completed_at: string | null;
          joined_at: string;
          progress: Json;
          user_id: string;
        };
        Insert: {
          challenge_id: string;
          completed_at?: string | null;
          joined_at?: string;
          progress?: Json;
          user_id: string;
        };
        Update: Partial<Database['public']['Tables']['challenge_participants']['Insert']>;
        Relationships: [];
      };
      challenges: {
        Row: {
          badge_url: string | null;
          created_at: string;
          description: string | null;
          ends_at: string;
          id: string;
          is_featured: boolean;
          name: string;
          starts_at: string;
          target: Json;
        };
        Insert: {
          badge_url?: string | null;
          created_at?: string;
          description?: string | null;
          ends_at: string;
          id?: string;
          is_featured?: boolean;
          name: string;
          starts_at: string;
          target?: Json;
        };
        Update: Partial<Database['public']['Tables']['challenges']['Insert']>;
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
        };
        Insert: {
          citations?: Json;
          content: string;
          created_at?: string;
          id?: string;
          role: string;
          thread_id: string;
        };
        Update: Partial<Database['public']['Tables']['coach_messages']['Insert']>;
        Relationships: [];
      };
      coach_threads: {
        Row: {
          created_at: string;
          id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          user_id: string;
        };
        Update: Partial<Database['public']['Tables']['coach_threads']['Insert']>;
        Relationships: [];
      };
      follows: {
        Row: {
          created_at: string;
          followee_id: string;
          follower_id: string;
        };
        Insert: {
          created_at?: string;
          followee_id: string;
          follower_id: string;
        };
        Update: Partial<Database['public']['Tables']['follows']['Insert']>;
        Relationships: [];
      };
      health_metrics_daily: {
        Row: {
          active_calories: number | null;
          date: string;
          hrv_ms: number | null;
          raw: Json;
          recovery_score: number | null;
          resting_hr: number | null;
          sleep_efficiency: number | null;
          sleep_minutes: number | null;
          source: string[];
          steps: number | null;
          strain_score: number | null;
          synced_at: string;
          user_id: string;
        };
        Insert: {
          active_calories?: number | null;
          date: string;
          hrv_ms?: number | null;
          raw?: Json;
          recovery_score?: number | null;
          resting_hr?: number | null;
          sleep_efficiency?: number | null;
          sleep_minutes?: number | null;
          source?: string[];
          steps?: number | null;
          strain_score?: number | null;
          synced_at?: string;
          user_id: string;
        };
        Update: Partial<Database['public']['Tables']['health_metrics_daily']['Insert']>;
        Relationships: [];
      };
      hydrocan_metrics_daily: {
        Row: {
          cans_logged: number;
          cellular_age_delta: number | null;
          computed_at: string;
          date: string;
          h2_index: number | null;
          hydration_depth: number | null;
          hydrogen_lift: number | null;
          inflammation_proxy: number | null;
          oxidative_load: number | null;
          recovery_velocity: number | null;
          user_id: string;
        };
        Insert: {
          cans_logged?: number;
          cellular_age_delta?: number | null;
          computed_at?: string;
          date: string;
          h2_index?: number | null;
          hydration_depth?: number | null;
          hydrogen_lift?: number | null;
          inflammation_proxy?: number | null;
          oxidative_load?: number | null;
          recovery_velocity?: number | null;
          user_id: string;
        };
        Update: Partial<Database['public']['Tables']['hydrocan_metrics_daily']['Insert']>;
        Relationships: [];
      };
      knowledge_base: {
        Row: {
          abstract: string;
          authors: string | null;
          citation_url: string | null;
          created_at: string;
          embedding: string | null;
          id: string;
          key_findings: Json;
          source_type: string;
          title: string;
          year: number | null;
        };
        Insert: {
          abstract: string;
          authors?: string | null;
          citation_url?: string | null;
          created_at?: string;
          embedding?: string | null;
          id?: string;
          key_findings?: Json;
          source_type?: string;
          title: string;
          year?: number | null;
        };
        Update: Partial<Database['public']['Tables']['knowledge_base']['Insert']>;
        Relationships: [];
      };
      notification_templates: {
        Row: {
          active: boolean;
          body: string;
          created_at: string;
          data: Json;
          id: string;
          title: string;
          trigger: string;
          variant: string;
        };
        Insert: {
          active?: boolean;
          body: string;
          created_at?: string;
          data?: Json;
          id?: string;
          title: string;
          trigger: string;
          variant?: string;
        };
        Update: Partial<Database['public']['Tables']['notification_templates']['Insert']>;
        Relationships: [];
      };
      posts: {
        Row: {
          created_at: string;
          id: string;
          payload: Json;
          squad_id: string | null;
          type: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          payload?: Json;
          squad_id?: string | null;
          type: string;
          user_id: string;
        };
        Update: Partial<Database['public']['Tables']['posts']['Insert']>;
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          daily_can_target: number;
          date_of_birth: string | null;
          display_name: string | null;
          goal: string | null;
          height_cm: number | null;
          id: string;
          locale: string;
          onboarding_completed_at: string | null;
          pin_hash: string | null;
          push_token: string | null;
          region: string | null;
          sex: string | null;
          units: string;
          updated_at: string;
          weight_kg: number | null;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          daily_can_target?: number;
          date_of_birth?: string | null;
          display_name?: string | null;
          goal?: string | null;
          height_cm?: number | null;
          id: string;
          locale?: string;
          onboarding_completed_at?: string | null;
          pin_hash?: string | null;
          push_token?: string | null;
          region?: string | null;
          sex?: string | null;
          units?: string;
          updated_at?: string;
          weight_kg?: number | null;
        };
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
        Relationships: [];
      };
      reactions: {
        Row: {
          created_at: string;
          id: string;
          kind: string;
          post_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          kind: string;
          post_id: string;
          user_id: string;
        };
        Update: Partial<Database['public']['Tables']['reactions']['Insert']>;
        Relationships: [];
      };
      squad_members: {
        Row: {
          joined_at: string;
          role: string;
          squad_id: string;
          user_id: string;
        };
        Insert: {
          joined_at?: string;
          role?: string;
          squad_id: string;
          user_id: string;
        };
        Update: Partial<Database['public']['Tables']['squad_members']['Insert']>;
        Relationships: [];
      };
      squads: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          invite_code: string;
          name: string;
          owner_id: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          invite_code: string;
          name: string;
          owner_id: string;
        };
        Update: Partial<Database['public']['Tables']['squads']['Insert']>;
        Relationships: [];
      };
      streaks: {
        Row: {
          current_streak: number;
          last_log_date: string | null;
          longest_streak: number;
          user_id: string;
        };
        Insert: {
          current_streak?: number;
          last_log_date?: string | null;
          longest_streak?: number;
          user_id: string;
        };
        Update: Partial<Database['public']['Tables']['streaks']['Insert']>;
        Relationships: [];
      };
      user_baselines: {
        Row: {
          hrv_baseline: number | null;
          hrv_std: number | null;
          last_computed: string | null;
          no_can_h2_baseline: number | null;
          rhr_baseline: number | null;
          rhr_std: number | null;
          sample_size: number;
          sleep_baseline_minutes: number | null;
          sleep_eff_baseline: number | null;
          user_id: string;
        };
        Insert: {
          hrv_baseline?: number | null;
          hrv_std?: number | null;
          last_computed?: string | null;
          no_can_h2_baseline?: number | null;
          rhr_baseline?: number | null;
          rhr_std?: number | null;
          sample_size?: number;
          sleep_baseline_minutes?: number | null;
          sleep_eff_baseline?: number | null;
          user_id: string;
        };
        Update: Partial<Database['public']['Tables']['user_baselines']['Insert']>;
        Relationships: [];
      };
      whoop_tokens: {
        Row: {
          access_token_enc: string | null;
          expires_at: string | null;
          last_synced_at: string | null;
          refresh_token_enc: string | null;
          user_id: string;
          whoop_user_id: string | null;
        };
        Insert: {
          access_token_enc?: string | null;
          expires_at?: string | null;
          last_synced_at?: string | null;
          refresh_token_enc?: string | null;
          user_id: string;
          whoop_user_id?: string | null;
        };
        Update: Partial<Database['public']['Tables']['whoop_tokens']['Insert']>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: {
      set_pin: { Args: { pin_code: string }; Returns: undefined };
      verify_pin: { Args: { pin_code: string }; Returns: boolean };
      reset_pin: { Args: never; Returns: undefined };
    };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type TablesInsert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];
export type TablesUpdate<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];
