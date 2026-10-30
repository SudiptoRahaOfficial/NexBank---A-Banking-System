'use client'

import { Check, ChevronDown, Wallet } from 'lucide-react'
import { formatCurrency } from './fund-transfer.utils'

export default function AccountSelector({
	accounts = [],
	selectedAccountId = '',
	onAccountChange,
	disabled = false,
}) {
	const selectedAccount = accounts.find(
		(account) => account._id === selectedAccountId,
	)

	return (
		<div className='space-y-2'>
			<label
				htmlFor='source-account'
				className='block text-sm font-semibold text-[#202B49]'
			>
				From account
			</label>

			<div className='relative'>
				<select
					id='source-account'
					value={selectedAccountId}
					onChange={(event) => onAccountChange?.(event.target.value)}
					disabled={disabled}
					className='w-full appearance-none rounded-xl border border-[#E2E5F0] bg-white px-4 py-3.5 pr-11 text-sm text-[#202B49] outline-none transition-colors focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10 disabled:cursor-not-allowed disabled:bg-[#F4F6FB] disabled:text-[#9CA3AF]'
				>
					<option
						value=''
						disabled
					>
						Select a source account
					</option>

					{accounts.map((account) => (
						<option
							key={account._id}
							value={account._id}
							disabled={account.status !== 'ACTIVE'}
						>
							{account._id} — {account.status}
						</option>
					))}
				</select>

				<ChevronDown
					size={18}
					className='pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280]'
					aria-hidden='true'
				/>
			</div>

			{selectedAccount ? (
				<div className='rounded-xl border border-[#E2E5F0] bg-[#F8FAFF] p-4'>
					<div className='flex items-start justify-between gap-3'>
						<div className='flex min-w-0 items-start gap-3'>
							<div className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#E9EFFF] text-[#4F46E5]'>
								<Wallet
									size={19}
									aria-hidden='true'
								/>
							</div>

							<div className='min-w-0'>
								<p className='text-sm font-semibold text-[#202B49]'>
									Selected account
								</p>

								<p className='mt-1 break-all font-mono text-xs text-[#6B7280]'>
									{selectedAccount._id}
								</p>
							</div>
						</div>

						<span
							className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
								selectedAccount.status === 'ACTIVE'
									? 'bg-[#DCFCE7] text-[#15803D]'
									: 'bg-[#FEE2E2] text-[#DC2626]'
							}`}
						>
							{selectedAccount.status === 'ACTIVE' && (
								<Check
									size={12}
									aria-hidden='true'
								/>
							)}
							{selectedAccount.status}
						</span>
					</div>

					<div className='mt-4 flex items-center justify-between border-t border-[#E2E5F0] pt-3'>
						<span className='text-sm text-[#6B7280]'>
							Available balance
						</span>

						<span className='text-sm font-semibold text-[#202B49]'>
							{formatCurrency(selectedAccount.currentBalance)}
						</span>
					</div>
				</div>
			) : (
				<p className='flex items-center gap-2 text-xs text-[#6B7280]'>
					<Wallet
						size={14}
						aria-hidden='true'
					/>
					Choose an account to view its available balance.
				</p>
			)}
		</div>
	)
}