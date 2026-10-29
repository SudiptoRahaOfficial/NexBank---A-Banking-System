import {
	ArrowDownLeft,
	ArrowUpRight,
	Building2,
	CircleDollarSign,
	Clock3,
	Eye,
	Plus,
	Wallet,
} from 'lucide-react'

const demoTransactions = [
	{
		id: 'demo-1',
		title: 'Monthly salary',
		description: 'Illustrative incoming payment',
		date: 'Oct 24, 2026',
		amount: '+ ৳ 45,000.00',
		type: 'credit',
	},
	{
		id: 'demo-2',
		title: 'Utility payment',
		description: 'Illustrative outgoing payment',
		date: 'Oct 22, 2026',
		amount: '- ৳ 2,500.00',
		type: 'debit',
	},
	{
		id: 'demo-3',
		title: 'Received transfer',
		description: 'Illustrative incoming transfer',
		date: 'Oct 20, 2026',
		amount: '+ ৳ 3,000.00',
		type: 'credit',
	},
]

export default function DashboardPreview() {
	return (
		<section
			aria-labelledby='dashboard-preview-title'
			className='px-4 pb-20 sm:px-6 sm:pb-24 lg:px-10'
		>
			<div className='mx-auto max-w-280'>
				<div className='mb-8 text-center'>
					<p className='text-sm font-semibold tracking-wide text-[#4F46E5]'>
						YOUR BANKING WORKSPACE
					</p>

					<h2
						id='dashboard-preview-title'
						className='mt-3 text-2xl font-bold tracking-tight text-[#202B49] sm:text-3xl'
					>
						A clearer view of your money
					</h2>

					<p className='mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#6B7280] sm:text-base'>
						See how account summaries, quick actions, and recent
						activity can come together in one organized dashboard.
					</p>
				</div>

				<div className='overflow-hidden rounded-2xl border border-[#E2E5F0] bg-white shadow-[0_20px_60px_-40px_rgba(32,43,73,0.35)]'>
					<div className='flex flex-col gap-4 border-b border-[#E2E5F0] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7'>
						<div className='flex items-center gap-3'>
							<div className='flex h-10 w-10 items-center justify-center rounded-xl bg-[#4F46E5] text-white'>
								<Building2
									size={21}
									aria-hidden='true'
								/>
							</div>

							<div>
								<p className='font-bold text-[#202B49]'>
									NexBank
								</p>
								<p className='mt-0.5 text-xs text-[#6B7280]'>
									Customer dashboard preview
								</p>
							</div>
						</div>

						<span className='inline-flex w-fit items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800'>
							<CircleDollarSign
								size={14}
								aria-hidden='true'
							/>
							Demo data only
						</span>
					</div>

					<div className='grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.05fr_1.4fr]'>
						<div className='space-y-5'>
							<div className='rounded-2xl bg-linear-to-br from-[#4F46E5] to-[#3730A3] p-5 text-white sm:p-6'>
								<div className='flex items-center justify-between gap-3'>
									<p className='text-sm font-medium text-indigo-100'>
										Illustrative total balance
									</p>

									<Eye
										size={18}
										className='text-indigo-100'
										aria-hidden='true'
									/>
								</div>

								<p className='mt-4 text-3xl font-bold tracking-tight sm:text-4xl'>
									৳ 1,25,450.00
								</p>

								<div className='mt-6 flex items-end justify-between gap-3'>
									<div>
										<p className='text-xs text-indigo-100'>
											Account ending
										</p>
										<p className='mt-1 text-sm font-semibold tracking-widest'>
											•••• 4821
										</p>
									</div>

									<Wallet
										size={28}
										className='text-indigo-200'
										aria-hidden='true'
									/>
								</div>
							</div>

							<div>
								<h3 className='text-sm font-bold text-[#202B49]'>
									Quick actions
								</h3>

								<div className='mt-3 grid grid-cols-2 gap-3'>
									<div className='rounded-xl border border-[#E2E5F0] p-4'>
										<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-[#4F46E5]'>
											<Plus
												size={20}
												aria-hidden='true'
											/>
										</div>

										<p className='mt-3 text-sm font-semibold text-[#202B49]'>
											Add account
										</p>

										<p className='mt-1 text-xs leading-5 text-[#6B7280]'>
											Create a banking account
										</p>
									</div>

									<div className='rounded-xl border border-[#E2E5F0] p-4'>
										<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700'>
											<ArrowUpRight
												size={20}
												aria-hidden='true'
											/>
										</div>

										<p className='mt-3 text-sm font-semibold text-[#202B49]'>
											Transfer funds
										</p>

										<p className='mt-1 text-xs leading-5 text-[#6B7280]'>
											Move money between accounts
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className='min-w-0'>
							<div className='flex items-center justify-between gap-3'>
								<div>
									<h3 className='font-bold text-[#202B49]'>
										Recent transactions
									</h3>
									<p className='mt-1 text-xs text-[#6B7280]'>
										Sample activity for visual preview
									</p>
								</div>

								<Clock3
									size={19}
									className='shrink-0 text-[#6B7280]'
									aria-hidden='true'
								/>
							</div>

							<div className='mt-4 divide-y divide-[#E2E5F0]'>
								{demoTransactions.map((transaction) => {
									const isCredit =
										transaction.type === 'credit'

									return (
										<div
											key={transaction.id}
											className='flex items-center gap-3 py-4'
										>
											<div
												className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
													isCredit
														? 'bg-green-50 text-green-700'
														: 'bg-red-50 text-red-700'
												}`}
											>
												{isCredit ? (
													<ArrowDownLeft
														size={19}
														aria-hidden='true'
													/>
												) : (
													<ArrowUpRight
														size={19}
														aria-hidden='true'
													/>
												)}
											</div>

											<div className='min-w-0 flex-1'>
												<p className='truncate text-sm font-semibold text-[#202B49]'>
													{transaction.title}
												</p>

												<p className='mt-1 text-xs text-[#6B7280]'>
													{transaction.date}
												</p>
											</div>

											<p
												className={`shrink-0 text-right text-sm font-bold tabular-nums ${
													isCredit
														? 'text-green-700'
														: 'text-[#202B49]'
												}`}
											>
												{transaction.amount}
											</p>
										</div>
									)
								})}
							</div>

							<p className='mt-3 rounded-lg bg-[#F4F6FB] p-3 text-xs leading-5 text-[#6B7280]'>
								These transactions are fictional examples. They
								do not represent actual transfers or account
								activity.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}