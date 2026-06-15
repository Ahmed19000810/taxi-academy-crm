export type UserRole = "admin" | "manager" | "agent";

export interface AppUser {
  uid: string; email: string | null; displayName: string | null; photoURL: string | null;
  role: UserRole; createdAt: Date; lastLoginAt: Date; isActive: boolean;
}

export interface AuthState { user: AppUser | null; isLoading: boolean; isAuthenticated: boolean; }

export interface NavItem { title: string; href: string; icon: string; roles?: UserRole[]; }

export type EligibilityStatus = "eligible" | "review_required" | "ineligible";

export interface EligibilityInput { customerName: string; age: number; council: string; drivingLicenceIssueDate: string; points: number; convictions: string[]; dbsStatus: "clear" | "flagged" | "pending"; medicalStatus: "fit" | "unfit" | "pending"; rightToWorkStatus: "valid" | "invalid" | "pending"; }

export interface EligibilityResult { status: EligibilityStatus; reasons: string[]; score: number; checkedAt: Date; }

export interface SalesLead { id: string; customerName: string; phoneNumber: string; email?: string; agentName: string; agentId?: string; status: LeadStatus; source?: string; notes?: string; createdAt: Date; updatedAt: Date; }
export type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "lost";

export interface Booking { id: string; customerName: string; phoneNumber: string; email?: string; bookingDate: Date; agentName: string; agentId?: string; notes?: string; leadId?: string; createdAt: Date; updatedAt: Date; }

export type MatchStatus = "matched" | "unmatched" | "duplicate";

export interface VerificationResult { id: string; customerName: string; phoneNumber: string; leadAgent: string; bookingAgent: string; bookingDate: Date | null; matchStatus: MatchStatus; confidenceScore: number; matchedField?: string; }

export interface AnalyticsSummary { totalLeads: number; totalBookings: number; conversionRate: number; duplicateLeads: number; topAgent: { name: string; conversions: number }; weeklyActivity: ActivityData[]; monthlyActivity: ActivityData[]; }

export interface ActivityData { date: string; leads: number; bookings: number; }

export interface ApiResponse<T = unknown> { success: boolean; data?: T; error?: string; message?: string; }
export interface PaginatedResponse<T> extends ApiResponse<T[]> { total: number; page: number; limit: number; totalPages: number; }